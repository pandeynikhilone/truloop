function ReviewCard({
    rating = 0,
    name = "Anonymous User",
    date = "",
    text = "",
    verified = false,
}) {
    return (
        <div className="flex flex-col gap-3 py-4 border-b border-gray-200 lg:p-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* Rating pill */}
                    <div className="px-3 py-1 bg-black text-white text-xs rounded-full flex items-center gap-1">
                        {rating} <span>★</span>
                    </div>

                    {/* Name */}
                    <div className="flex items-center gap-1 text-sm font-medium">
                        {name}
                        {verified && (
                            <span className="text-gray-400 text-xs">
                                <img src="/product_info/verified.svg" />
                            </span>
                        )}
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <img src="/product_info/calendar.svg" />
                    {date}
                </div>
            </div>

            {/* Review text */}
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
        </div>
    );
}

export default ReviewCard;
