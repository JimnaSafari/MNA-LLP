# Palsa POS Frontend - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository
```bash
# Create a new repository on GitHub named "palsa-pos-frontend"
# Then connect your local repository:
git remote add origin https://github.com/YOUR_USERNAME/palsa-pos-frontend.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Automatic Deployment (Recommended)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `palsa-pos-frontend` repository
5. Configure environment variables (see below)
6. Click "Deploy"

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Environment Variables

Set these in your Vercel project dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.railway.app/api` | Laravel backend API URL |

## 🔧 Complete Setup Guide

### Prerequisites
- ✅ Laravel backend deployed on Railway
- ✅ GitHub account
- ✅ Vercel account

### Step-by-Step Deployment

#### 1. Prepare Your Backend URL
First, make sure your Laravel backend is deployed on Railway and note the URL:
```
https://your-app-name.railway.app
```

#### 2. Update Environment Configuration
Edit `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

#### 3. Push to GitHub
```bash
# If you haven't set up the remote yet:
git remote add origin https://github.com/YOUR_USERNAME/palsa-pos-frontend.git

# Push your code:
git add .
git commit -m "Ready for Vercel deployment"
git push -u origin main
```

#### 4. Deploy on Vercel
1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Click "New Project" → "Import Git Repository"
3. **Select Repository**: Choose your `palsa-pos-frontend` repository
4. **Configure Project**:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. **Environment Variables**: Add `NEXT_PUBLIC_API_URL`
6. **Deploy**: Click "Deploy"

#### 5. Configure Custom Domain (Optional)
1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔗 Backend Integration

### CORS Configuration
Make sure your Laravel backend allows requests from your Vercel domain.

In your Laravel `config/cors.php`:
```php
'allowed_origins' => [
    'https://your-frontend.vercel.app',
    'http://localhost:3000', // for development
],
```

### API Endpoints
Your frontend will connect to these Laravel API endpoints:
- `POST /api/auth/login` - Authentication
- `GET /api/dashboard/stats` - Dashboard data
- `GET /api/products` - Products list
- `POST /api/orders` - Create orders
- `POST /api/mpesa/stk-push` - M-Pesa payments

## 🧪 Testing Your Deployment

### 1. Basic Functionality Test
- ✅ Visit your Vercel URL
- ✅ Login page loads
- ✅ Can authenticate with backend
- ✅ Dashboard displays data
- ✅ POS interface works
- ✅ Can create orders

### 2. M-Pesa Integration Test
- ✅ M-Pesa payment button works
- ✅ STK push is triggered
- ✅ Payment status updates

### 3. Mobile Responsiveness
- ✅ Works on mobile devices
- ✅ Touch interactions work
- ✅ Layout adapts properly

## 🔧 Troubleshooting

### Common Issues

**1. API Connection Failed**
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend is running and accessible
- Check CORS configuration in Laravel

**2. Build Errors**
- Check for TypeScript errors: `npm run build`
- Verify all dependencies are installed
- Check for missing environment variables

**3. Authentication Issues**
- Verify API endpoints are correct
- Check token storage in localStorage
- Ensure backend authentication is working

**4. M-Pesa Not Working**
- Verify M-Pesa credentials in backend
- Check callback URLs are accessible
- Test with valid Kenyan phone numbers

### Debug Commands
```bash
# Check build locally
npm run build

# Test production build locally
npm start

# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

## 📊 Performance Optimization

### Vercel Optimizations
- ✅ Automatic image optimization
- ✅ Edge caching
- ✅ Gzip compression
- ✅ CDN distribution

### Custom Optimizations
- Images: Use Next.js Image component
- Fonts: Optimize font loading
- Bundle: Analyze with `npm run analyze`

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys
```

### Preview Deployments
Every pull request gets a preview deployment:
- Create feature branch
- Push changes
- Create pull request
- Get preview URL

## 📈 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor page views, performance, and errors
- Track user interactions

### Error Tracking
- Check Vercel Functions logs
- Monitor API response times
- Set up alerts for errors

## 🔐 Security

### Environment Variables
- Never commit `.env.local` to git
- Use Vercel environment variables for production
- Rotate API keys regularly

### HTTPS
- Vercel provides automatic HTTPS
- Custom domains get SSL certificates
- All traffic is encrypted

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify backend connectivity
3. Test API endpoints directly
4. Check browser console for errors

---

## 🎉 Success!

Your Palsa POS frontend should now be live on Vercel! 

**Next Steps:**
1. Test all functionality
2. Set up monitoring
3. Configure custom domain
4. Train users on the system

**URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.railway.app`
- Admin Panel: `https://your-project.vercel.app/dashboard`