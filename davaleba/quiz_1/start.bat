@echo off
title Running Orders Angular App
cd /d "%~dp0"
echo ==============================================
echo   Orders Angular App იტვირთება...
echo   გაიხსნება მისამართზე: http://localhost:4200
echo ==============================================
start http://localhost:4200
npm start
pause
