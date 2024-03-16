import users from "../models/users.js";
import pagination from "../services/pagination.js";

export const getUsers = async (req, res, next) => {
  try {
    const allUser = await users.findAll();
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const paginatedResults = pagination(page, limit, allUser);
    return res.status(200).json(paginatedResults);
  } catch (error) {
    next(error);
  }
};

export const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserID = await users.findByPk(id);
    if (!UserID) {
      return res.status(404).json({ messsage: "User not found" });
    }
    res.status(200).json(UserID);
  } catch (error) {
    next(error);
  }
};

export const createUsers = async (req, res, next) => {
  try {
    const { email, gender, Password, confirmPassword, role } = req.body;
    if (Password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm Password are not same" });
    }

    if (Password === "" || Password === null) {
      return res.status(400).json({ msg: "empty password not allowed" });
    } else {
      const hashPass = hashPassword(Password);
      const password = hashPass;
      await users.create({
        email,
        gender,
        password,
        role,
      });
      return res.status(200).json({ msg: "Created Account Succesfull" });
    }
  } catch (error) {
    next(error);
  }
};


export const updateUsers = async (req, res, next) => {
  try {
    //check if user already exists
    const { id } = req.params;
    const { email, gender, password, role } = req.body;
    const existingUsers = await users.findByPk(id);
    if (!existingUsers) return res.status(404).json({ msg: "User not found" });

   
    await existingUsers.update({
      email: email || existingUsers.title,
      gender: gender || existingUsers.gender,
      password: password || existingUsers.password,
      role: role || existingUsers.role,
    });

    
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUsers = await users.findByPk(id);
    if (!existingUsers) return res.status(404).json({ msg: "User not found" });

    await existingUsers.destroy();
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};