function RatingBar({ star, count, total }) {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Star label */}
      <div className="flex items-center gap-1 w-10">
        <span className="text-sm">{star}</span>
        <span>★</span>
      </div>

      {/* Bar */}
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Count */}
      <span className="text-sm w-6 text-right">
        {count.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default RatingBar;
