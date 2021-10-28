@echo off
echo "ooo"

git pull

git add *

set now=%date% %time%

echo "Time:" %now%

git commit -m "%now%"

git push

echo "ooo"

pause