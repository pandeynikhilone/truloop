import RatingBar from "./RatingBar";

function RatingsReviews() {
  const ratings = [
    { star: 5, count: 13 },
    { star: 4, count: 10 },
    { star: 3, count: 7 },
    { star: 2, count: 5 },
    { star: 1, count: 5 },
  ];

  const totalRatings = 45;

  return (
    <section className="max-w-xl mx-auto px-4 py-6 lg:mx-18">
      <h2 className="text-xl lg:text-3xl font-semibold mb-16">
        Rating & Reviews
      </h2>

      <div className="flex gap-8">
        {/* Left side */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-semibold">4.1</span>
            <span className="text-2xl">★</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            45 Ratings & <br /> 20 Reviews
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col gap-3">
          {ratings.map((item) => (
            <RatingBar
              key={item.star}
              star={item.star}
              count={item.count}
              total={totalRatings}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RatingsReviews;
