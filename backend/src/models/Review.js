import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    productModel: {
      type: String,
      required: false
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

    usageDuration: {
      type: String,
      required: true
    },

    recommend: {
      type: String, // "Yes" or "No"
      enum: ["Yes", "No"],
      required: true
    },

    proof: {
      type: String, // URL or Base64
      required: false
    },

    reviewerName: {
      type: String,
      default: "Anonymous User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
