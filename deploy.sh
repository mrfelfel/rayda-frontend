#!/bin/sh

ng build --prod  --output-path=server/dist --common-chunk
cp ./liara.json ./server
#grunt purifycss
cd server
#npm i
touch dist/robots.txt
npm run compress
#npm run deploy
