import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    price: {
      type: Number,
      required: true,
      index: true
    },

    images: {
      type: [String],
      required: true
    },

    description: {
      type: String,
      required: false
    },

    // Key specs shown on product page
    specifications: {
      type: Map,
      of: String
    },

    averageRating: {
      type: Number,
      default: 0
    },

    reviewCount: {
      type: Number,
      default: 0
    },

    // Needed for rating bars (5★ → 1★)
    ratingBreakdown: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
