import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: [ true, "Please provide a email!"]
    },
    password: {
        type: String,
        required: [ true, "Please provide a password!"],
        minlenght: 8
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin; 