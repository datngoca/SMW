const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const faker = require("faker");

// Kết nối tới MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://doanngocdat:besdat0205@cluster0.t3f75mg.mongodb.net/SMW", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1);
  }
};

// Định nghĩa mô hình người dùng
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);

// Định nghĩa mô hình vai trò
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

const Role = mongoose.model("Role", roleSchema);

// Tạo dữ liệu giả mạo
const createFakeData = async () => {
  try {
    // Kết nối tới MongoDB
    await connectDB();

    // Tạo vai trò
    const roles = await Role.create([
      { name: "Admin", description: "Quản trị viên" },
      { name: "User", description: "Người dùng" },
    ]);

    // Tạo người dùng giả mạo với vai trò ngẫu nhiên
    const numUsers = 5;
    for (let i = 0; i < numUsers; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = await User.encryptPassword(faker.internet.password());

      // Chọn một vai trò ngẫu nhiên từ danh sách các vai trò
      const randomRoleIndex = Math.floor(Math.random() * roles.length);
      const role = roles[randomRoleIndex];

      const user = new User({
        username,
        email,
        password,
        roles: [role._id],
      });
      await user.save();
    }
    console.log(`Tạo thành công ${numUsers} người dùng giả mạo.`);
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu giả mạo:", error);
  }
};

// Gọi hàm để tạo dữ liệu giả mạo
createFakeData().catch((error) => console.error("Lỗi:", error));
