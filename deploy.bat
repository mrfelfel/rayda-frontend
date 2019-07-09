@echo off
title My Program
color E
ng build --prod  --output-path=dist --common-chunk
pause
copy liara_nginx.conf dist
copy liara.json dist
xcopy /es/ .well-known dist
cd dist

liara deploy
