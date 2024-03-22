import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  const productData = req.body;
  console.log("the product data => ", productData);

  try {
    const blablabla = req.body.name;
    const existingProduct = await Product.findOne({ name: blablabla }).exec();
    console.log("existing product => ", existingProduct);

    if (existingProduct?.name === blablabla) {
      return res.status(409).json({
        success: false,
        message:
          "Product already exists, choose another name or update the stock.",
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      newProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not created.",
      error: error.message,
    });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All products.",
      allProducts: products,
      productsLength: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "All products not fetched.",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the product id => ", id);
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      message: "Product found.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
};

const updatedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the product id => ", id);
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);

    console.log("the product => ", updatedProduct);

    const updatefulfilled = await Product.findById(updatedProduct._id);

    res.status(200).json({
      success: true,
      message: "Product updated.",
      updatefulfilled,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not updated",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the product id => ", id);
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not deleted",
      error: error.message,
    });
  }
};

export {
  allProducts,
  getProduct,
  updatedProduct,
  deleteProduct,
  createProduct,
};
