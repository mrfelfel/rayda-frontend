ng build --prod  --output-path=dist --common-chunk

copy liara_nginx.conf dist
copy liara.json dist
xcopy /es/ .well-known dist
cd dist

copy robots.txt /B+ ,,/Y
liara deploy
