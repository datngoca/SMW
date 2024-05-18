import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import { SECRET } from "../config.js";

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    console.log(req.body);
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser)
    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    newUser.tokens = [{ token, signedAt: Date.now().toString() }]
    await newUser.save();
    // Saving the User Object in Mongodb


    return res.status(200).json({ success: true, data: savedUser });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    if (!userFound) {
      if (!req.body.email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await User.findOne({ username: req.body.email }).populate("roles");
      if (!user) {
        return res.status(400).json({ message: "User Not Found" });
      }

      if (user.loginAttempts >= 5) {
        setTimeout(async () => {
          user.loginAttempts = 0;
          await user.save();
          console.log("Login attempts reset successfully.");
        }, 10000); // 10 seconds

        return res.status(400).json({ message: "Bạn đã đăng nhập quá nhiều lần" });
      }

      user.loginAttempts += 1;
      await user.save();
      return res.status(400).json({ message: "User Not Found" });
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) {
      if (userFound.loginAttempts >= 5) {
        setTimeout(async () => {
          userFound.loginAttempts = 0;
          await userFound.save();
          console.log("Login attempts reset successfully.");
        }, 10000); // 10 seconds

        return res.status(400).json({ message: "Bạn đã nhập sai mật khẩu quá nhiều lần" });
      }

      userFound.loginAttempts += 1;
      await userFound.save();
      return res.status(401).json({
        success: false,
        token: null,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    await User.findByIdAndUpdate(userFound._id, {
      tokens: [{ token, signedAt: Date.now().toString() }]
    });
    userFound.loginAttempts=0;
    res.json({ success: true, data: userFound, token });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const logoutHandler = async (req, res) => {
  if (req.headers && req.headers["x-access-token"]) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    // const tokens = req.user.tokens;
    // const newTokens = tokens.filter(t => t.token !== token);    
    // await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    // res.json({ success: true, message: 'Sign out successfully!' });
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded.id;

      const user = await User.findById(decoded.id, { password: 0 });
      if (!user) return res.status(404).json({ message: "No user found" });
      await User.findByIdAndUpdate(decoded.id, { tokens: [] });
      res.json({ success: true, message: 'Sign out successfully!' });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  }

};
