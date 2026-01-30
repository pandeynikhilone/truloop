"use client";

import { useEffect, useState } from "react";
import Navigation from "@/app/components/common/Navigation";
import Footer from "@/app/components/common/Footer";
import ReviewsList from "./ReviewsList";
import RatingsReviews from "./RatingsReviews";
import { useRouter } from "next/navigation";

export default function AllReviewsClient({ id }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        async function fetchReviews() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`
                );

                if (!res.ok) throw new Error("Failed to fetch reviews");

                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.error("Reviews fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading reviews...</div>;

    return (
        <div>
            <Navigation />
            <div className="max-w-7xl mx-auto px-5 py-10 lg:px-10">

                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="cursor-pointer flex items-center gap-2 text-Grey-2 hover:text-black transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back to Product</span>
                    </button>
                </div>

                <h1 className="text-3xl font-bold mb-8">All Reviews</h1>

                <RatingsReviews reviews={reviews} />
                <ReviewsList reviews={reviews} />
            </div>
            <Footer />
        </div>
    );
}
