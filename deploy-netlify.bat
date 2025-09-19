@echo off
echo ================================
echo Netlify Deployment Helper
echo ================================
echo.

echo 1. Building for Netlify deployment...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo 2. Build successful! Output directory: out/
echo.

echo 3. Committing changes to git...
git add .
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update for Netlify deployment

git commit -m "%commit_msg%"

echo.
echo 4. Pushing to GitHub...
git push origin main

echo.
echo ================================
echo Deployment Options:
echo ================================
echo.
echo Option 1: Netlify Dashboard (Recommended)
echo 1. Go to https://netlify.com
echo 2. Sign in with GitHub
echo 3. Click "New site from Git"
echo 4. Select your MNA-LLP repository
echo 5. Build settings:
echo    - Build command: npm run build
echo    - Publish directory: out
echo 6. Environment variables:
echo    - NEXT_PUBLIC_API_URL: https://your-railway-backend.railway.app/api
echo    - NODE_VERSION: 18
echo 7. Deploy!
echo.
echo Option 2: Netlify CLI
echo 1. Install: npm install -g netlify-cli
echo 2. Login: netlify login
echo 3. Deploy: netlify deploy --prod --dir=out
echo.

echo ================================
echo Important Notes:
echo ================================
echo - Make sure your Railway backend URL is correct
echo - The frontend is configured for static export
echo - CORS is configured to allow Netlify domains
echo - All environment variables must be set in Netlify dashboard
echo.

set /p open_netlify="Open Netlify dashboard? (y/n): "
if /i "%open_netlify%"=="y" (
    start https://netlify.com
)

pause