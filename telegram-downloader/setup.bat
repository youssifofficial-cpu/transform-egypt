@echo off
cd /d "%~dp0"
echo ============================================
echo   Telegram Video Downloader  -  Setup
echo ============================================
echo.

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python is not installed, or not on your PATH.
  echo.
  echo   1. Download Python 3.9+ from https://www.python.org/downloads/
  echo   2. During install, TICK the box "Add Python to PATH".
  echo   3. Run this setup.bat again.
  echo.
  pause
  exit /b 1
)

if not exist ".venv" (
  echo Creating virtual environment...
  python -m venv .venv
)

echo Installing dependencies...
".venv\Scripts\python.exe" -m pip install --upgrade pip
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
  echo.
  echo [ERROR] Failed to install dependencies. Check your internet connection.
  pause
  exit /b 1
)

if not exist "config.ini" (
  copy "config.example.ini" "config.ini" >nul
  echo.
  echo Created config.ini  --  open it in Notepad and fill in
  echo your api_id and api_hash before running the tool.
)

echo.
echo ============================================
echo   Setup complete.
echo   Next: edit config.ini, then double-click run.bat
echo ============================================
pause
