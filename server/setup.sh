#!/bin/bash

# Create the data directory for MongoDB
mkdir -p ./data

# Create the .env.local file
echo "Enter your Gemini API Key:"
read GEMINI_API_KEY

cat <<EOL >.env.local
GEMINI_API_KEY=${GEMINI_API_KEY}
MONGO_URI=mongodb://localhost:27017/livechat
PORT=5002
EOL

# Run MongoDB in the background
mongod --dbpath=./data --port 2701 &

# Build and start the server
npm run build
npm run start
