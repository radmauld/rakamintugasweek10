import users from "../models/users.js";
import pagination from "../services/pagination.js";

export const findAll = async (req, res, next) => {
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

export const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { email, gender, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }

    if (password === "" || password === null) {
      return res.status(400).json({ message: "Empty password not allowed" });
    } else {
      await users.create({
        email,
        gender,
        password,
        role,
      });
      return res.status(200).json({ message: "Account created successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, gender, password, role } = req.body;
    const existingUser = await users.findByPk(id);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    await existingUser.update({
      email: email || existingUser.email,
      gender: gender || existingUser.gender,
      password: password || existingUser.password,
      role: role || existingUser.role,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await users.findByPk(id);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    await existingUser.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
