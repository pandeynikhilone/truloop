"use client";

import { useEffect, useState } from "react";

export default function AdminReviewsClient() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setReviews(reviews.filter((review) => review._id !== id));
            } else {
                alert("Failed to delete review");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting review");
        }
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Reviews</h2>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Reviewer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Comment</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {review.productId?.name || "Unknown Product"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex flex-col">
                                        <span>{review.reviewerName}</span>
                                        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <span>⭐</span>
                                        <span className="font-medium">{review.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={review.comment}>
                                    {review.comment}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="text-red-500 hover:text-red-700 hover:underline text-sm font-medium cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-900">{review.productId?.name || "Unknown Product"}</h3>
                                <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                <span className="text-yellow-500 text-xs">⭐</span>
                                <span className="text-xs font-bold">{review.rating}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-700">{review.reviewerName}</p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">"{review.comment}"</p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-100">
                    No reviews found.
                </div>
            )}
        </div>
    );
}
