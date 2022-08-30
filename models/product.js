import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"]
  },
  imageUrl: {
    type: String,
    required: [true, "please select image!"]
  },
  price: {
    type: Number,
    required: [true, "price most be required!"]
  },
  description: {
    type: String,
    required:[ true, "please enter description!"]
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
