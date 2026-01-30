import express from "express";
import {
  createReview,
  getReviewsByProduct
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/:productId", getReviewsByProduct);

export default router;
