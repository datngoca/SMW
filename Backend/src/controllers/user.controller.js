import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      success: true, data: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      }
    });
  } catch (error) {
    console.error({ success: false, data: error });
  }
};

export const getUsers = async (req, res) => {
  const user = await User.find(req.params.userId);
  return res.json({ success: true, data: user });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json({ success: true, data: user });
};
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  return res.json({ success: true, data: user });
};
export const resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // Tìm kiếm người dùng trong cơ sở dữ liệu bằng userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Mã hóa mật khẩu mới
    const encryptedPassword = await User.encryptPassword(newPassword);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = encryptedPassword;

    // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
    await user.save();

    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const changeIfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.username = username;
    user.email = email;
    const newifo = await user.save();
    return res.status(200).json({ success: true, data: newifo });
  }
  catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
