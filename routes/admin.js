import express from "express";

import {
  getAdminLogin,
  postAdminLogin,
  updateAdim,
  deleteAdmin,
} from "../controllers/admin.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/admin", getAdminLogin);

router.post("/admin", postAdminLogin);

router.put("/admin/:id",  updateAdim);

router.delete("/admin/:id", deleteAdmin);

export default router;
