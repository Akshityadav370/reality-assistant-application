#!/bin/bash

# List PM2 processes
sudo pm2 list

# Stop the Node.js server using PM2
echo "Stopping node-cms process..."
sudo pm2 stop food-app
if [ $? -ne 0 ]; then
  echo "Failed to stop node-cms process or process not found"
fi

# If necessary, delete the process to ensure it is not running
echo "Deleting node-cms process..."
sudo pm2 delete food-app
if [ $? -ne 0 ]; then
  echo "Failed to delete node-cms process or process not found"
fi