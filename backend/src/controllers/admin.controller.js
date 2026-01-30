import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Products
        const totalProducts = await Product.countDocuments();

        // 2. Total Reviews
        const totalReviews = await Review.countDocuments();

        // 3. Overall Average Rating
        // We can aggregate all reviews to get a global average
        const ratingStats = await Review.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);

        const averageRating = ratingStats.length > 0
            ? parseFloat(ratingStats[0].avgRating).toFixed(1)
            : "0.0";

        res.status(200).json({
            totalProducts,
            totalReviews,
            averageRating,
            recentActivity: [] // Could be populated later
        });

    } catch (error) {
        console.error("ADMIN STATS ERROR:", error.message);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
};
