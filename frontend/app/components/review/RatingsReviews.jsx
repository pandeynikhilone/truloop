import RatingBar from "./RatingBar";

function RatingsReviews({ reviews = [] }) {
    const totalReviews = reviews.length;

    const averageRating = totalReviews === 0 ? 0 : (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

    const ratings = [5, 4, 3, 2, 1].map((star) => ({ star, count: reviews.filter((r) => r.rating === star).length, }));

    return (
        <section className="max-w-xl mx-auto px-4 py-6 lg:mx-18">
            <h2 className="text-xl lg:text-3xl font-semibold mb-16">
                Rating & Reviews
            </h2>

            <div className="flex gap-8">
                {/* Left side */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                        <span className="text-4xl font-semibold">
                            {averageRating}
                        </span>
                        <span className="text-2xl">
                            <img src="/product_info/star.svg" alt="star" />
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        {totalReviews} Ratings
                    </p>
                </div>

                {/* Right side */}
                <div className="flex-1 flex flex-col gap-3">
                    {ratings.map((item) => (
                        <RatingBar
                            key={item.star}
                            star={item.star}
                            count={item.count}
                            total={totalReviews}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RatingsReviews;
