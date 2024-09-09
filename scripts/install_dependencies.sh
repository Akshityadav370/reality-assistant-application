#!/bin/bash
# Navigate to your app directory (adjust the path as needed)
cd /var/www/html/app

#Copy env file
#sudo cp .env.example .env

# Install npm dependencies
echo "Installing dependencies..."
sudo npm install
sudo npm run build

