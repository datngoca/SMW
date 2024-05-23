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
  try {
    // Lấy tất cả các vai trò từ database và tạo một đối tượng ánh xạ giữa ID và tên vai trò
    const roles = await Role.find();
    const roleMapping = {};
    roles.forEach(role => {
      roleMapping[role._id] = role.name;
    });

    // Lấy tất cả người dùng từ database
    const users = await User.find();

    // Thay thế ID vai trò bằng tên vai trò trong danh sách người dùng
    const usersWithRoleNames = users.map(user => {
      const rolesWithName = user.roles.map(roleId => roleMapping[roleId] || roleId);
      return { ...user._doc, roles: rolesWithName };
    });

    // Lọc người dùng chỉ có vai trò là 'user'
    const filteredUsers = usersWithRoleNames.filter(user => user.roles.includes('user'));

    return res.json({ success: true, data: filteredUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json({ success: true, data: user });
};
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  return res.json({ success: true, data: user });
};
