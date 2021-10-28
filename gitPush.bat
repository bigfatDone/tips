@echo off
echo "--begin--"
start "C:\Windows\System32\cmd.exe"
cd E:\tips

git pull

git add *

set now=%date% %time%

echo "Time:" %now%

git commit -m "%now%"

git push

echo "--end--"

pause