import express from "express";
import {
  createReview,
  getReviewsByProduct,
  getAllReviews,
  deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);
router.post("/", createReview);
router.get("/:productId", getReviewsByProduct);
router.delete("/:id", deleteReview);

export default router;
