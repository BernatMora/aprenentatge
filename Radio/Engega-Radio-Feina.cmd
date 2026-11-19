@echo off
cd /d "%~dp0"
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "%~dp0Arrenca-Radio-Feina.ps1"
if errorlevel 1 (
  echo.
  echo No s'ha pogut engegar Radio-Feina. Copia el missatge o adjunta diagnostic-arrencada.txt.
  pause
)
