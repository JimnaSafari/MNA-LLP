# Palsa POS Frontend

Modern Point of Sale system frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🛒 **Point of Sale Interface** - Intuitive product selection and cart management
- 📊 **Dashboard** - Real-time sales analytics and business insights
- 💳 **M-Pesa Integration** - Seamless mobile money payments for Kenyan market
- 🏷️ **Product Management** - Complete inventory and category management
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔐 **Authentication** - Secure login system with role-based access
- 💰 **Kenya Shillings** - Native KES currency formatting and calculations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Laravel backend API

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd palsa-pos-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/palsa-pos-frontend)

### Manual Deployment

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Set Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_API_URL`: Your Laravel backend URL (e.g., `https://your-app.railway.app/api`)

### Environment Variables

Set these in your Vercel project settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Laravel backend API URL | `https://your-backend.railway.app/api` |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── pos/              # Point of Sale interface
│   ├── login/            # Authentication
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   └── Layout.tsx       # Main app layout
├── lib/                 # Utilities and configurations
│   ├── api.ts          # Axios configuration
│   └── currency.ts     # Kenya Shillings formatting
└── types/              # TypeScript type definitions
    └── index.ts        # Main types
```

## Features Overview

### Point of Sale (POS)
- Product search and filtering
- Category-based product browsing
- Shopping cart management
- Real-time stock checking
- Multiple payment methods (Cash, M-Pesa, Card)
- VAT calculation (16% Kenyan rate)

### Dashboard
- Sales analytics and KPIs
- Today's performance metrics
- Recent orders overview
- Low stock alerts
- Revenue tracking

### Product Management
- Add, edit, and delete products
- Category management
- Stock level monitoring
- Price management
- Product image support

### Payment Integration
- M-Pesa STK Push integration
- Cash payment processing
- Payment status tracking
- Receipt generation

## API Integration

The frontend communicates with the Laravel backend through RESTful APIs:

- **Authentication**: `/api/auth/login`
- **Dashboard**: `/api/dashboard/stats`
- **Products**: `/api/products`
- **Orders**: `/api/orders`
- **M-Pesa**: `/api/mpesa/stk-push`

## Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update components in `src/components/`
- Customize colors and branding

### Currency
- Kenya Shillings formatting in `src/lib/currency.ts`
- VAT rate configuration (currently 16%)

### Features
- Add new pages in `src/app/`
- Extend types in `src/types/`
- Add new API endpoints in `src/lib/api.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@example.com]

---

Built with ❤️ for Kenyan businesses