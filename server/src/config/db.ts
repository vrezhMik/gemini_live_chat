import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = "mongodb://127.0.0.1:27017/gemini";
    const conn = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`
    );
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    console.error(`Error connecting to MongoDB: ${errorMessage}`);
    process.exit(1);
  }
};
