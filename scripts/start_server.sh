#!/bin/bash
# Navigate to your app directory (if necessary)
cd /var/www/html/app/build

# Start the node.js application using PM2
echo "Starting Node.js server with PM2..."
pm2 start index.js --name food-app

# Save the PM2 process list. Useful for PM2 to respawn the application on reboot.
pm2 save
