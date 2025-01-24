import mongoose from "mongoose";
import { MONGODB_URI } from "./constants.js";

const dbConnect = async () => {
  try {
    if (!MONGODB_URI) {
      console.error(
        "❌ MongoDB URI is not defined in the environment variables."
      );
      process.exit(1);
    }
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
