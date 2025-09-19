# Palsa POS Frontend - Netlify Deployment Guide

## 🚀 Deploy to Netlify

Your Next.js POS frontend is now configured for Netlify deployment with static export.

### Quick Deployment Steps

#### Option 1: Netlify Dashboard (Recommended)

1. **Go to Netlify**: Visit [netlify.com](https://netlify.com)
2. **Sign up/Login** with GitHub
3. **New Site from Git**: Click "New site from Git"
4. **Choose GitHub**: Select GitHub as your Git provider
5. **Select Repository**: Choose your `MNA-LLP` repository
6. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (in Environment variables)

7. **Environment Variables**: Add these in Site Settings > Environment Variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-railway-backend.railway.app/api
   NODE_VERSION = 18
   ```

8. **Deploy**: Click "Deploy site"

#### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your frontend directory
cd "Palsa POS/palsa-pos-frontend"
netlify deploy --prod --dir=out
```

### Configuration Files Added

#### `netlify.toml`
- Build configuration
- Redirect rules for SPA routing
- Environment variables
- Security headers
- Caching rules

#### `next.config.ts` (Updated)
- Static export enabled
- Image optimization disabled (for static export)
- Trailing slash enabled
- ESM externals configuration

## 🔧 Build Process

### What Happens During Build:
1. Next.js builds the application
2. Static files are exported to `out/` directory
3. Netlify serves the static files
4. Client-side routing handles navigation

### Build Commands:
```bash
# Development
npm run dev

# Production build (for Netlify)
npm run build

# Alternative build command
npm run build:netlify
```

## 🌐 Environment Variables

Set these in your Netlify dashboard under **Site Settings > Environment Variables**:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.railway.app/api` | Laravel backend API URL |
| `NODE_VERSION` | `18` | Node.js version for build |

## 🔗 Integration with Railway Backend

### CORS Configuration
Your Laravel backend already has CORS configured to allow Netlify domains:

```php
'allowed_origins_patterns' => [
    '/^https:\/\/.*\.netlify\.app$/',
],
```

### API Endpoints
The frontend will connect to these Railway backend endpoints:
- `POST /api/auth/login` - Authentication
- `GET /api/dashboard/stats` - Dashboard data
- `GET /api/products` - Products
- `POST /api/orders` - Create orders
- `POST /api/mpesa/stk-push` - M-Pesa payments

## 🧪 Testing Your Deployment

### Pre-deployment Testing
```bash
# Test build locally
npm run build

# Serve the static files locally
npx serve out
```

### Post-deployment Testing
1. ✅ Visit your Netlify URL
2. ✅ Test login functionality
3. ✅ Check dashboard loads data
4. ✅ Test POS interface
5. ✅ Verify M-Pesa integration
6. ✅ Test on mobile devices

## 🔧 Troubleshooting

### Common Issues

**1. Build Fails**
```bash
# Check for TypeScript errors
npm run lint

# Test build locally
npm run build
```

**2. API Connection Issues**
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check Railway backend is accessible
- Test API endpoints directly

**3. Routing Issues**
- Netlify redirects are configured in `netlify.toml`
- SPA routing should work automatically

**4. Images Not Loading**
- Images are unoptimized for static export
- Use standard `<img>` tags instead of Next.js `Image` component if needed

### Debug Commands
```bash
# Check environment variables
echo $NEXT_PUBLIC_API_URL

# Test API connection
curl https://your-railway-backend.railway.app/api/health

# Check build output
ls -la out/
```

## 📊 Performance Optimizations

### Netlify Features
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Gzip compression
- ✅ Asset optimization
- ✅ Form handling (if needed)

### Custom Optimizations
- Static export for faster loading
- Optimized images
- Cached static assets
- Security headers

## 🔄 Continuous Deployment

### Automatic Deployments
Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update frontend"
git push origin main
# Netlify automatically builds and deploys
```

### Deploy Previews
- Every pull request gets a preview deployment
- Test changes before merging
- Share preview links with team

## 🔐 Security Features

### Headers (Configured in netlify.toml)
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### HTTPS
- Automatic SSL certificates
- Force HTTPS redirects
- Secure cookie handling

## 📈 Monitoring

### Netlify Analytics
- Enable in Site Settings
- Track page views and performance
- Monitor build times

### Error Tracking
- Check Netlify build logs
- Monitor API response times
- Set up alerts for build failures

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Add your domain in Site Settings
   - Update DNS records
   - SSL certificate auto-generated

2. **Performance Monitoring**
   - Enable Netlify Analytics
   - Monitor Core Web Vitals
   - Track user interactions

3. **Team Collaboration**
   - Add team members
   - Set up branch deployments
   - Configure deploy notifications

## 📞 Support

### Netlify Resources
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)
- [Netlify Community](https://community.netlify.com/)

### Troubleshooting Steps
1. Check Netlify build logs
2. Verify environment variables
3. Test API endpoints
4. Check browser console

---

## 🎉 Success!

Your Palsa POS frontend will be live on Netlify!

**Expected URLs:**
- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://your-railway-app.railway.app`

The complete POS system will be ready for production use!