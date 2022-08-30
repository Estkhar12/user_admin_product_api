import express from "express";
import {
  allUsers,
  postUserSignup,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user.js";

const router = express.Router();

router.get("/user", allUsers);

router.post("/user/signup", postUserSignup);

router.post("/user/login", login);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

export default router;
