export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  min_stock_level: number;
  category_id: number;
  category?: Category;
  image?: string;
  barcode?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  products_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  user?: User;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  payment_method: 'cash' | 'mpesa' | 'card';
  payment_status: 'pending' | 'completed' | 'failed';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product?: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DashboardStats {
  total_sales: number;
  total_orders: number;
  total_products: number;
  low_stock_products: number;
  today_sales: number;
  today_orders: number;
  recent_orders: Order[];
}

export interface MpesaPayment {
  phone_number: string;
  amount: number;
  order_id: number;
}