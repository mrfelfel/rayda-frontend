#!/bin/sh

ng build --prod  --output-path=dist --common-chunk

cp ./liara_nginx.conf ./dist
cp ./liara.json ./dist
cp -r .well-known ./dist
cd dist
touch robots.txt
liara deploy
