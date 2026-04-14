import ReviewCard from "./ReviewCard";

function ReviewsList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <section className="flex flex-col gap-4 mt-6 lg:p-10 p-5">
                <p className="text-sm text-gray-500">
                    No reviews yet. Be the first to review this product.
                </p>
            </section>
        );
    }

    // Grouping reviews by user (using userId OR name as fallback)
    const groupedReviews = reviews.reduce((acc, review) => {
        const userId = review.userId?._id || review.userId;
        const name = review.reviewerName;

        const existingGroup = acc.find(group => {
            const groupUserId = group[0].userId?._id || group[0].userId;
            const groupName = group[0].reviewerName;

            // Group if EITHER userId matches OR (both have no userId AND names match)
            if (userId && groupUserId) {
                return userId === groupUserId;
            }
            return !userId && !groupUserId && name === groupName;
        });

        if (existingGroup) {
            existingGroup.push(review);
        } else {
            acc.push([review]);
        }
        return acc;
    }, []);

    return (
        <section className="flex flex-col gap-4 mt-6 lg:p-10 p-5">
            {groupedReviews.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-col">
                    {group.map((review, idx) => (
                        <ReviewCard
                            key={review._id}
                            rating={review.rating}
                            name={review.reviewerName}
                            text={review.comment}
                            date={new Date(review.createdAt).toLocaleDateString()}
                            verified={review.reviewerName !== "Anonymous User"}
                            isUpdate={idx > 0}
                        />
                    ))}
                </div>
            ))}
        </section>
    );
}

export default ReviewsList;
