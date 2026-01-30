"use client";

import { useEffect, useState } from "react";
import Navigation from "@/app/components/common/Navigation";
import Footer from "@/app/components/common/Footer";
import RatingsReviews from "@/app/components/review/RatingsReviews";
import ReviewsList from "@/app/components/review/ReviewsList";
import Card from "@/app/components/common/Card";
import Link from "next/link";

export default function ProductClient({ id }) {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!id) return; // 🔥 guard clause

        async function fetchProduct() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
                );

                if (!res.ok) throw new Error("Failed to fetch product");

                const data = await res.json();

                setProduct({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.images || "/homepage/rectangle.svg",
                    rating: Math.round(data.averageRating ?? 0),
                    reviewCount: data.reviewCount ?? 0,
                    specs: data.specifications ?? {},
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        async function fetchReviews() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,
                );

                if (!res.ok) throw new Error("Failed to fetch reviews");

                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.error("Reviews fetch error:", err.message);
            }
        }

        fetchReviews();
    }, [id]);

    if (loading) return <div className="p-10">Loading...</div>;
    if (error) return <div className="p-10 text-red-500">{error}</div>;
    return (
        <div>
            <Navigation />
            <div>
                <div className="flex flex-col my-11 justify-around lg:flex-row p-5">
                    <div className="justify-items-center lg:w-[40%]">
                        <img className="h-75 lg:h-115 lg:w-130" src={product.image} />
                    </div>
                    <div className="flex flex-col lg:w-[35%] gap-10">
                        {/* Product Info */}
                        <div className="flex flex-col gap-4">
                            {/* Title & Rating */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-Grey-2 text-xl lg:text-3xl font-bold leading-7">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <img src="/product_info/star.svg" alt="star" className="h-4 w-4" />
                                        <span className="font-bold text-sm lg:text-base">
                                            {product.rating}
                                        </span>
                                    </div>
                                    <span className="h-1 w-1 rounded-full bg-Grey-2"></span>
                                    <span className="text-xs font-medium text-Grey-2 lg:text-sm">
                                        {product.reviewCount} Ratings
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-Grey-2 text-xl lg:text-2xl font-bold leading-7">
                                {product.price}
                            </div>
                        </div>

                        {/* Key Specifications */}
                        <div className="flex flex-col">
                            <button className="px-3 py-1 bg-black text-white rounded text-sm lg:text-md font-bold w-fit">
                                Key Specifications
                            </button>

                            <div className="flex flex-col gap-1 text-xs lg:text-sm text-Grey-2 mt-4 mb-10">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex gap-2">
                                        <span className="font-bold w-fit">{key}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Link href={`/submit-review?productId=${product.id}`}>
                                    <button className="cursor-pointer px-3 py-1 gap-2 bg-black text-white rounded-full text-sm lg:text-[15px] lg:px-4 lg:py-2 font-bold w-fit flex">
                                        <img
                                            className="w-3.75"
                                            src="/product_info/submit_review.svg"
                                        />
                                        Submit Review
                                    </button>
                                </Link>

                                <button className="cursor-pointer px-3 py-1 gap-2 bg-black text-white rounded-full text-sm lg:text-[15px] lg:px-4 lg:py-2 font-bold w-fit flex">
                                    <img className="w-3.75" src="/product_info/add_update.svg" />
                                    Add Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <RatingsReviews reviews={reviews} />
                <ReviewsList reviews={reviews.slice(0, 4)} />
                {reviews.length > 4 && (
                    <div className="mt-4 px-5 lg:px-10">
                        <Link href={`/product-info/${id}/reviews`}>
                            <button className="cursor-pointer py-3 px-6 bg-black text-white rounded-md text-sm font-bold">
                                Read More
                            </button>
                        </Link>
                    </div>
                )}

                <div className="my-10 md:px-10 flex flex-col gap-8 lg:mb-25 lg:mt-12">
                    <div className="flex w-full justify-center text-center text-2xl md:text-3xl lg:text-4xl lg:justify-center font-bold">
                        Same Brand Products
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 w-fit mx-auto gap-1.5 gap-y-4 lg:gap-6">
                        {products.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
