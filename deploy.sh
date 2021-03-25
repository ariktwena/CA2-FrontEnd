#!/usr/bin/env bash

XXXX="codedev/html"
DROPLET_URL="161.35.220.48"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

#To deploy from terminal: ./deploy.sh
echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$XXXX

#scp -r ./build/* root@161.35.220.48:/var/www/codedev/html

#Deploy using: bash deploy.sh


