@echo off
setlocal
echo "# LoginSafeAuth" >> README.md
git init
git add .
git commit -m "Login Safe Auth Initial and Final Commit"
git branch -M main
git remote add origin https://github.com/Cirrus-aryan/LoginSafeAuth.git
git push -u origin main
endlocal
pause