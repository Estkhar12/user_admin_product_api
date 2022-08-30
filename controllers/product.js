import Product from "../models/product.js";

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    console.log(product);
    res.status(200).json({
      status: "Succes",
      product
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, imageUrl, price, description } = req.body;
    const image = req.file.path.replace("\\", "/");

    const newProduct = new Product({
      name: name,
      imageUrl : image,
      price: price,
      description: description,
    });
    const saveProduct = await newProduct.save();
    res.status(200).json({
      status: "Added new Product!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Not added product",
    });
  }
};

const findProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleProduct = await Product.findById(id, req.body);
    res.status(200).json({
      status: "Product find",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res, next) => {

  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "updated product!",
      updatedProduct
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id, req.body);
    res.status(200).json({
      status: "Product deleted!"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {getProduct, addProduct, findProduct, updateProduct, deleteProduct };
