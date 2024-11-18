#!/bin/bash

# Function to handle cleanup on Ctrl+C
cleanup() {
  echo "Cleaning up..."
  
  # Kill MongoDB process
  echo "Stopping MongoDB..."
  mongopid=$(pgrep mongod)
  if [ -n "$mongopid" ]; then
    kill -9 "$mongopid"
    echo "MongoDB stopped."
  else
    echo "No MongoDB process found."
  fi
  
  # Stop Docker container
  echo "Stopping Docker container..."
  docker stop mongo-container >/dev/null 2>&1 && docker rm mongo-container >/dev/null 2>&1
  echo "Docker container stopped and removed."
  
  # Kill all npm processes
  echo "Stopping npm processes..."
  npm_pids=$(pgrep -f "npm")
  if [ -n "$npm_pids" ]; then
    echo "$npm_pids" | xargs kill -9
    echo "npm processes stopped."
  else
    echo "No npm processes found."
  fi

  echo "Cleanup complete. Exiting..."
  exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT

# Function to kill any process using port 27017
kill_port_27017() {
  if lsof -i :27017 >/dev/null; then
    echo "Port 27017 is in use. Killing the process..."
    lsof -ti :27017 | xargs kill -9
    echo "Port 27017 has been freed."
  else
    echo "Port 27017 is available."
  fi
}

# Navigate to the server directory
echo "Navigating to the server directory..."
cd server || { echo "Directory 'server' not found! Aborting."; exit 1; }

# Create the 'data' directory if it doesn't exist
if [ ! -d "data" ]; then
  echo "Creating data directory..."
  mkdir data
else
  echo "Data directory already exists."
fi

# Kill any process using port 27017
kill_port_27017

# Build the Docker image
echo "Building Docker image..."
docker build -t mongo-image .

# Check if a container with the same name exists
if [ "$(docker ps -aq -f name=mongo-container)" ]; then
  echo "Stopping and removing existing container..."
  docker stop mongo-container
  docker rm mongo-container
fi

# Run the Docker container
echo "Running the Docker container..."
docker run -d --name mongo-container -p 27017:27017 mongo-image

# Start MongoDB as a background process using --fork
echo "Starting MongoDB..."
mongod --dbpath=./data --port 27017 --fork --logpath ./data/mongodb.log

if [ $? -ne 0 ]; then
  echo "Failed to start MongoDB. Check the log file at ./data/mongodb.log for details."
  exit 1
fi

# Prompt for Gemini API Key (in green)
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "${GREEN}Enter your Gemini API Key:${NC}"
read -r GEMINI_API_KEY

# Create or overwrite the .env.local file
echo "Creating .env.local file..."
cat > .env.local <<EOL
GEMINI_API_KEY=$GEMINI_API_KEY
MONGO_URI=mongodb://mongodb:27017/livechat
PORT=5002
EOL
echo ".env.local file created with the provided values."

# Install server dependencies
echo "Installing server dependencies..."
npm i

# Build and start the backend
echo "Building the backend..."
npm run build

echo "Starting the backend..."
npm run start & # Run in the background

# Navigate to the client directory
echo "Navigating to the client directory..."
cd ../client || { echo "Client directory not found! Aborting."; exit 1; }

# Create the .env.production file
echo "Creating .env.production file..."
cat > .env.production <<EOL
REACT_APP_BACKEND=http://localhost:5002
EOL
echo ".env.production file created with backend URL."

# Install client dependencies
echo "Installing client dependencies..."
npm i

# Build and start the frontend
echo "Building the frontend..."
npm run build

echo "Starting the frontend in development mode..."
npm i -g serve
serve -s build