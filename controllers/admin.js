import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";

const getAdminLogin = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      status: "find Admin",
      data: admin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const postAdminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({
      email: email,
      password: hashPassword,
    });
    const adminSave = await newAdmin.save();
    const token = jwt.sign({ id: newAdmin._id }, "mysecret");

    res.status(200).json({
      status: "Admin created!",
      token,
      data: adminSave,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdim = async (req, res, next) => {
  const id = req.params.id;
  try {
    const newupdate = await Admin.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      status: "Admin Updated!",
      data: newupdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id, req.body);
    res.status(200).json({
      status: "Admin Deleted!",
      data: deletedAdmin,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAdminLogin, postAdminLogin, updateAdim, deleteAdmin };
