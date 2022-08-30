import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      resutl: users.length,
      data:{
        users
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const postUserSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Email or password wrong!",
      });
    }
    const user = await User.findOne({ email });
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
      return res.status(401).json({
        msg: 'email or password is wrong!'
      })
    }
    const token = jwt.sign({userId: user._id}, 'json-secret');
    res.status(200).json({
      status: "User LogedIn",
      data: user,
      accessToken: token
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    req.body.password = hashPassword;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "User Updated!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id, req.body);
    res.status(200).json({
      status: "User deleted!",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { allUsers, postUserSignup, updateUser, deleteUser, login };
