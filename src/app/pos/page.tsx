'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Product, CartItem, Category } from '@/types';
import { formatKESSimple } from '@/lib/currency';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

export default function POS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory && product.is_active;
  });

  const addToCart = (product: Product) => {
    if (product.stock_quantity <= 0) {
      toast.error('Product out of stock');
      return;
    }

    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock_quantity) {
        toast.error('Not enough stock available');
        return;
      }
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product && quantity > product.stock_quantity) {
      toast.error('Not enough stock available');
      return;
    }

    setCart(cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.16; // 16% VAT
  };

  const processOrder = async (paymentMethod: 'cash' | 'mpesa' | 'card') => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setProcessing(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
        payment_method: paymentMethod,
        total_amount: calculateTotal() + calculateTax(),
        tax_amount: calculateTax(),
      };

      const response = await api.post('/orders', orderData);
      
      if (paymentMethod === 'mpesa') {
        // Handle M-Pesa payment
        const phoneNumber = prompt('Enter M-Pesa phone number (254XXXXXXXXX):');
        if (phoneNumber) {
          await api.post('/mpesa/stk-push', {
            phone_number: phoneNumber,
            amount: Math.ceil(orderData.total_amount),
            order_id: response.data.id,
          });
          toast.success('M-Pesa payment request sent!');
        }
      } else {
        toast.success('Order processed successfully!');
      }

      clearCart();
      fetchProducts(); // Refresh products to update stock
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to process order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-full">
        {/* Products Section */}
        <div className="flex-1 pr-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Point of Sale</h1>
            
            {/* Search and Filter */}
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{formatKESSimple(product.price)}</p>
                <p className="text-xs text-gray-400">Stock: {product.stock_quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-96 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">{formatKESSimple(item.product.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 rounded-full hover:bg-red-100 text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatKESSimple(calculateTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (16%):</span>
                  <span>{formatKESSimple(calculateTax())}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{formatKESSimple(calculateTotal() + calculateTax())}</span>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => processOrder('cash')}
                  disabled={processing}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                >
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Cash Payment
                </button>
                <button
                  onClick={() => processOrder('mpesa')}
                  disabled={processing}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
                >
                  <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
                  M-Pesa Payment
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}