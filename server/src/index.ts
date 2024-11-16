import express from "express";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./utils/errorHandler";
import { environment } from "./config/environment";
// import { connectDB } from "./config/db";
var cors = require("cors");

const app = express();
app.use(cors());
// Connect to the database
// connectDB();

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware);

// Routes
app.use("/", chatRoutes);

// Error handler
app.use(errorHandler);

// Start the server
app.listen(environment.port, () => {
  console.log(`Server running at http://localhost:${environment.port}`);
});
