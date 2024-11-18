🌟 Gemini AI Clone
A full-stack implementation of a conversational AI tool, designed for seamless deployment and development. This project automates the setup process, requiring minimal manual intervention.

🚀 Technologies Used
Node.js: Backend server for handling requests and processing logic.
React: Frontend framework for building a dynamic and responsive UI.
MongoDB: Database for storing and managing application data.
Docker: Containerizes the MongoDB instance, simplifying deployment.
Shell Script: Automates the build and deployment processes.
🛠️ Setup and Installation
⚙️ Prerequisites
Ensure the following are installed on your system:

Docker: Download Docker
🔄 Automated Setup
Clone this repository to your local machine:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Make the start.sh script executable:

bash
Copy code
chmod +x start.sh
Run the script to start the setup:

bash
Copy code
./start.sh
During installation, you will be prompted to enter your Gemini API key. Follow the prompts to complete the setup.

🛠️ Manual Setup (If Issues Occur)
If you encounter issues with the automated setup, follow these steps to run the project manually:

1️⃣ Run MongoDB:
bash
Copy code
docker build -t mongo-image .
docker run -d --name mongo-container -p 27017:27017 mongo-image
mongod --dbpath=./data --port 27017 --fork --logpath ./data/mongodb.log
2️⃣ Run the Backend:
bash
Copy code
cd server
npm install
npm run build
npm run start
3️⃣ Run the Frontend:
bash
Copy code
cd client
npm install
npm run build
serve -s build
💡 Challenges and Solutions
🧩 Challenges
Revisiting backend and DevOps concepts after focusing on frontend development for several years.
✅ Solutions
Developed a clear project plan inspired by ChatGPT's functionality.
Leveraged online documentation and prior experience to address issues efficiently.
⏱️ Time Spent
Approximately 25 hours were spent planning, developing, and debugging the project.
🌟 Happy coding! 💻

ChatGPT can make mistakes. Check important info.
