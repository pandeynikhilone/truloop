import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: true,
      trim: true
    },

    reviewerName: {
      type: String,
      default: "Anonymous User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
