"use client";
import { useState } from "react";

function CouponCard({ discount = 10, code = "TRUPRO", expiryDate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Format date: e.g., "15 June 2026"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="border-2 border-black rounded-xl p-4 flex flex-col gap-2 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <span className="text-lg font-extrabold uppercase">{discount}% OFF</span>
        <span className="text-[10px] text-gray-500 font-medium">Expires: {formatDate(expiryDate)}</span>
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Coupon Code</span>

        <div className="flex items-center gap-3 border-2 border-dashed border-black rounded-lg px-3 py-1.5 bg-gray-50">
          <span className="text-sm font-black tracking-tighter">{code}</span>

          <button
            onClick={handleCopy}
            className="text-xs underline cursor-pointer flex items-center justify-center p-1 hover:bg-black/5 rounded-full transition-colors"
            type="button"
            title="Copy Code"
          >
            {copied ? (
              <span className="text-[10px] font-bold text-green-600">Copied!</span>
            ) : (
              <img src="/user_profile/copy.svg" className="w-4 h-4" alt="copy" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
