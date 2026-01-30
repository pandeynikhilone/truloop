import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, reviewer } = req.body;

    if (!productId || rating === undefined || !comment || !reviewer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    const product = await Product.findById(productObjectId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = await Review.create({
      productId: productObjectId,
      rating,
      comment,
      reviewer,
    });

    const reviews = await Review.find({ productId: productObjectId });

    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    product.averageRating = Number(averageRating.toFixed(1));
    product.reviewCount = reviews.length;

    await product.save();

    res.status(201).json(review);
  } catch (error) {
    console.error("CREATE REVIEW ERROR");
    console.error(error);
    res.status(500).json({
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// GET /api/reviews/:productId
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("FETCH REVIEWS ERROR:", error.message);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
