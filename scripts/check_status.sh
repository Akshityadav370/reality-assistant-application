#!/bin/bash
# Check the status of the Node.js server
echo "Checking server status..."

# Example of a simple curl to your local server's health check endpoint
curl -f http://localhost:8000/health
if [ $? -eq 0 ]; then
    echo "Server is up and running."
else
    echo "Failed to start the server."
    exit 1
fi
