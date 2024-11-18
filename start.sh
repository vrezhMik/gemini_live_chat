#!/bin/bash

cleanup() {
  echo "Cleaning up..."
  

  echo "Stopping MongoDB..."
  mongopid=$(pgrep mongod)
  if [ -n "$mongopid" ]; then
    kill -9 "$mongopid"
    echo "MongoDB stopped."
  else
    echo "No MongoDB process found."
  fi
  

  echo "Stopping Docker container..."
  docker stop mongo-container >/dev/null 2>&1 && docker rm mongo-container >/dev/null 2>&1
  echo "Docker container stopped and removed."
  

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


trap cleanup SIGINT


kill_port_27017() {
  if lsof -i :27017 >/dev/null; then
    echo "Port 27017 is in use. Killing the process..."
    lsof -ti :27017 | xargs kill -9
    echo "Port 27017 has been freed."
  else
    echo "Port 27017 is available."
  fi
}


echo "Navigating to the server directory..."
cd server || { echo "Directory 'server' not found! Aborting."; exit 1; }


if [ ! -d "data" ]; then
  echo "Creating data directory..."
  mkdir data
else
  echo "Data directory already exists."
fi


kill_port_27017


echo "Building Docker image..."
docker build -t mongo-image .


if [ "$(docker ps -aq -f name=mongo-container)" ]; then
  echo "Stopping and removing existing container..."
  docker stop mongo-container
  docker rm mongo-container
fi

echo "Running the Docker container..."
docker run -d --name mongo-container -p 27017:27017 mongo-image


echo "Starting MongoDB..."
mongod --dbpath=./data --port 27017 --fork --logpath ./data/mongodb.log

if [ $? -ne 0 ]; then
  echo "Failed to start MongoDB. Check the log file at ./data/mongodb.log for details."
  exit 1
fi


GREEN='\033[0;32m'
NC='\033[0m' 
echo -e "${GREEN}Enter your Gemini API Key:${NC}"
read -r GEMINI_API_KEY


echo "Creating .env.local file..."
cat > .env.local <<EOL
GEMINI_API_KEY=$GEMINI_API_KEY
MONGO_URI=mongodb://mongodb:27017/livechat
PORT=5002
EOL
echo ".env.local file created with the provided values."


echo "Installing server dependencies..."
npm i


echo "Building the backend..."
npm run build

echo "Starting the backend..."
npm run start &  


echo "Navigating to the client directory..."
cd ../client || { echo "Client directory not found! Aborting."; exit 1; }


echo "Creating .env.production file..."
cat > .env.production <<EOL
REACT_APP_BACKEND=http://localhost:5002
EOL
echo ".env.production file created with backend URL."


echo "Installing client dependencies..."
npm i

echo "Building the frontend..."
npm run build

echo "Starting the frontend in development mode..."
npm i -g serve
serve -s build
