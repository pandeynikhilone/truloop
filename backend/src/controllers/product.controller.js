import Product from "../models/Product.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    console.log('Creating product with data:', req.body);
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error.message);
    console.error('Error details:', error);
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error.message);
    res.status(400).json({ message: "Failed to update product" });
  }
};
