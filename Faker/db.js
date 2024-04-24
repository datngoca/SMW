// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
