// import mongoose from "mongoose";
// import { MONGODB_URI } from "./config.js";


// try {
//   const db = await mongoose.connect(MONGODB_URI);
//   console.log("Database is connected to", db.connection.name);
// } catch (error) {
//   console.error(error.message);
// }
import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import User from './models/User.js'; // Đảm bảo đường dẫn đúng

// Hàm reset loginAttempts cho tất cả người dùng
const resetLoginAttemptsForAllUsers = async () => {
  try {
    await User.updateMany({}, { $set: { loginAttempts: 0 } });
    console.log("All users' login attempts reset successfully.");
  } catch (error) {
    console.log("Error resetting login attempts:", error);
  }
};

// Kết nối đến cơ sở dữ liệu và reset loginAttempts
const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected to", db.connection.name);

    // Gọi hàm reset loginAttempts khi hệ thống khởi động
    await resetLoginAttemptsForAllUsers();
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

// Gọi hàm connectDB để kết nối đến cơ sở dữ liệu và reset loginAttempts
connectDB();

