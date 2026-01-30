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

  return (
    <section className="flex flex-col gap-4 mt-6 lg:p-10 p-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          rating={review.rating}
          name={review.reviewerName}
          text={review.comment}
          date={new Date(review.createdAt).toLocaleDateString()}
          verified={true}
        />
      ))}

      {/* Read More (UI-only for now) */}
      <button className="mt-4 py-3 px-4 bg-black text-white w-fit rounded-md cursor-pointer text-sm font-medium">
        Read More
      </button>
    </section>
  );
}

export default ReviewsList;
