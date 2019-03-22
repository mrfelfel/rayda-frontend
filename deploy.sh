#!/bin/sh

ng build --prod  --output-path=dist 

cp ./liara_nginx.conf ./dist
cp ./liara.json ./dist

cd dist

liara deploy
