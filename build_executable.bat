@echo off
setlocal

echo ==========================================
echo   Ultimate Scheduler Build Helper
echo ==========================================
echo.

:: Check for OneDrive
echo %CD% | findstr /C:"OneDrive" >nul
if %errorlevel%==0 (
    echo.
    echo [WARNING] ONEDRIVE DETECTED!
    echo.
    echo It looks like this folder is inside OneDrive:
    echo %CD%
    echo.
    echo Building in OneDrive often fails with "Operation not permitted" errors.
    echo We STRONGLY recommend moving this entire folder to a location like:
    echo C:\Ultimate_Scheduler
    echo.
    echo Press Ctrl+C to stop now, or any key to try building anyway.
    pause
)

echo.
echo Step 1: Installing dependencies...
echo (This might take a few minutes)
echo.

call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed.
    echo If you see "EPERM" errors above, please move the folder out of OneDrive.
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Building Executable...
echo.

call npm run dist
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo   SUCCESS!
echo ==========================================
echo.
echo You can find the executables in the "dist" folder.
echo.
pause
