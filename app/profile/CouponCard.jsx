"use client";
import { useState } from "react";

function CouponCard() {
  const code = "TRU200";
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

  return (
    <div className="border-2 border-black rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <span className="text-lg font-bold">10% OFF</span>
        <span className="text-[10px] text-gray-500">Expires: 12 June 2026</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Coupon Code</span>

        <div className="flex items-center gap-2 border border-black rounded px-2 py-1">
          <span className="text-sm font-semibold">{code}</span>

          <button
            onClick={handleCopy}
            className="text-xs underline cursor-pointer"
            type="button"
          >
            {copied ? "Copied!" : <img src="/user_profile/copy.svg" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
