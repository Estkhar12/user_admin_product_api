import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    select: true
  },
});

const User =  mongoose.model("User", userSchema);

export default User;
