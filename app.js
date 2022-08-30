import {} from "dotenv/config";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import productRoute from "./routes/product.js";

const __dirname = path.resolve();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("file"));
// app.use("/uploads" ,express.json(path.join("uploads")));

app.use(userRoute);
app.use(adminRoute);
app.use(productRoute);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("server is start on 3000 port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
