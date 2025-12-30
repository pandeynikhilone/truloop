import ReviewCard from "./ReviewCard";

function ReviewsList() {
  const reviews = [
    {
      rating: 4,
      name: "Ankit Sharma",
      date: "23, August, 2025",
      verified: true,
      text: "I've been using the phone for two weeks now, and so far the experience is solid. The display is bright, the camera performs well in daylight, and the battery easily lasts a full day with moderate use. However, I did notice slight heating while gaming for long sessions. Overall, it feels like a good value for the price.",
    },
    {
      rating: 4,
      name: "Ankit Sharma",
      date: "23, August, 2025",
      verified: true,
      text: "I've been using the phone for two weeks now, and so far the experience is solid. The display is bright, the camera performs well in daylight, and the battery easily lasts a full day with moderate use. However, I did notice slight heating while gaming for long sessions. Overall, it feels like a good value for the price.",
    },
  ];

  return (
    <section className="flex flex-col gap-4 mt-6 lg:p-10">
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}

      {/* Read More */}
      <button className="mt-4 py-3 px-4 bg-black text-white w-fit rounded text-sm font-medium">
        Read More
      </button>
    </section>
  );
}

export default ReviewsList;
