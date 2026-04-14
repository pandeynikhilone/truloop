function ReviewCard({
    rating = 0,
    name = "Anonymous User",
    date = "",
    text = "",
    verified = false,
    isUpdate = false,
}) {
    return (
        <div className={`flex flex-col gap-3 py-4 border-b border-gray-100 lg:p-10 ${isUpdate ? "ml-6 lg:ml-16 border-l-2 border-gray-200 pl-4 lg:pl-10 -mt-1 bg-gray-50/20" : ""}`}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* Rating pill */}
                    <div className="px-3 py-1 bg-black text-white text-xs rounded-full flex items-center gap-1">
                        {rating} <span>★</span>
                    </div>

                    {/* Name - only show if NOT an update */}
                    {!isUpdate && (
                        <div className="flex items-center gap-1 text-sm font-medium">
                            {name}
                            {verified && (
                                <span className="text-gray-400 text-xs">
                                    <img src="/product_info/verified.svg" alt="verified" />
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <img src="/product_info/calendar.svg" alt="calendar" />
                    {date}
                </div>
            </div>

            {/* Review text */}
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
        </div>
    );
}

export default ReviewCard;
