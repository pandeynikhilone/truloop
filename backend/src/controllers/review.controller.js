import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import User from "../models/user.model.js";  

// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const {
      productId,
      rating,
      comment,
      reviewer,
      productModel,
      usageDuration,
      recommend,
      proof,
      userId,                                  
    } = req.body;

    if (!productId || rating === undefined || !comment || !reviewer || !usageDuration || !recommend) {
      return res.status(400).json({ message: "All required fields are required" });
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
      reviewerName: reviewer,
      productModel,
      usageDuration,
      recommend,
      proof,
      userId: userId && mongoose.Types.ObjectId.isValid(userId) ? userId : null,
      reviewType: req.body.reviewType || "initial",
    });

    // Recalculate product rating
    const reviews = await Review.find({ productId: productObjectId });
    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    product.averageRating = Number(averageRating.toFixed(1));
    product.reviewCount = reviews.length;
    await product.save();

    // ✅ ADDED: Award 50 points if this is the user's first review of this product
    let pointsAwarded = false;
    let updatedPoints = null;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      
      const updated = await User.findByIdAndUpdate(
        userObjectId,
        {
          $inc: { points: 50 },
          $addToSet: { reviewedProducts: productObjectId },
        },
        { new: true, select: "points reviewedProducts" }
      );

      if (updated) {
        pointsAwarded = true;
        updatedPoints = updated.points;
      }
    }

    res.status(201).json({ 
      review, 
      pointsAwarded, 
      updatedPoints, 
      updatedReviewedProducts: updated?.reviewedProducts || [] 
    });

  } catch (error) {
    console.error("CREATE REVIEW ERROR", error);
    res.status(500).json({ message: "Failed to add review", error: error.message });
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

// GET /api/reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate("productId", "name images");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("FETCH ALL REVIEWS ERROR:", error.message);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(id);

    const product = await Product.findById(productId);
    if (product) {
      const reviews = await Review.find({ productId });
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
      product.averageRating = Number(averageRating.toFixed(1));
      product.reviewCount = reviews.length;
      await product.save();
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error.message);
    res.status(500).json({ message: "Failed to delete review" });
  }
};