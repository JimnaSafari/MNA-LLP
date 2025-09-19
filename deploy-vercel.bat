@echo off
echo ================================
echo Vercel Deployment Helper
echo ================================
echo.

echo 1. Checking if git is initialized...
if not exist .git (
    echo Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit - Palsa POS Frontend"
) else (
    echo Git repository already exists.
)

echo.
echo 2. Adding changes to git...
git add .
git status

echo.
echo 3. Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update Palsa POS Frontend

git commit -m "%commit_msg%"

echo.
echo 4. Deployment Options:
echo.
echo Option 1: Deploy to Vercel (Recommended)
echo - Create account at https://vercel.com
echo - Connect your GitHub repository
echo - Set environment variable: NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
echo - Deploy automatically
echo.
echo Option 2: Manual Vercel CLI deployment
echo - Install: npm i -g vercel
echo - Run: vercel --prod
echo.

set /p deploy_choice="Push to GitHub now? (y/n): "
if /i "%deploy_choice%"=="y" (
    echo.
    echo Make sure you have:
    echo - Created a GitHub repository for the frontend
    echo - Set the remote origin URL
    echo.
    set /p repo_url="Enter your GitHub repository URL: "
    if not "%repo_url%"=="" (
        git remote add origin %repo_url%
        git branch -M main
        git push -u origin main
        echo.
        echo ================================
        echo Frontend pushed to GitHub!
        echo.
        echo Next steps:
        echo 1. Go to https://vercel.com
        echo 2. Import your GitHub repository
        echo 3. Set NEXT_PUBLIC_API_URL environment variable
        echo 4. Deploy!
        echo ================================
    )
) else (
    echo.
    echo Manual deployment steps:
    echo 1. Push to GitHub: git push origin main
    echo 2. Connect to Vercel
    echo 3. Set environment variables
    echo 4. Deploy
)

pause