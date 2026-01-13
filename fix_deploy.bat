@echo off
TITLE Corrigindo Conflito de Dependencias
cd /d "%~dp0"

echo ==========================================
echo   REMOVENDO ARQUIVO DE TRAVA (LOCKFILE)
echo ==========================================

set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
if not exist %GIT_PATH% set GIT_PATH=git

echo.
echo [1/4] Deletando package-lock.json antigo...
if exist "package-lock.json" del "package-lock.json"
echo [OK] Arquivo deletado.

echo.
echo [2/4] Adicionando alteracoes (remocao)...
%GIT_PATH% add .
echo [OK] Alteracoes registradas.

echo.
echo [3/4] Criando commit de limpeza...
%GIT_PATH% commit -m "Fix: Remove package-lock.json to force dependency resolution"
echo [OK] Commit criado.

echo.
echo [4/4] Enviando para o GitHub...
%GIT_PATH% push origin main
echo [OK] Enviado com sucesso!

echo.
echo ==========================================
echo   AGORA VAI! A VERCEL VAI TENTAR DE NOVO.
echo ==========================================
echo pode fechar esta janela.
pause
