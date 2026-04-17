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

    purchaseDate: {
      type: Date,
      required: false
    },

    recommend: {
      type: String, 
      enum: ["Yes", "No"],
      required: true
    },

    proof: {
      type: String, 
      required: false
    },

    reviewerName: {
      type: String,
      default: "Anonymous User"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    reviewType: {
      type: String,
      enum: ["initial", "update"],
      default: "initial"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
