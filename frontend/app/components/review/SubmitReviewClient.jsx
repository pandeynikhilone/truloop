"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SubmitReviewClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");

  const [rating, setRating] = useState("4");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState("Yes");
  const [productModel, setProductModel] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [fileName, setFileName] = useState("");
  const [proof, setProof] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProof(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!productId) {
      setError("Product ID missing");
      setLoading(false);
      return;
    }

    if (!usageDuration) {
      setError("Please specify how long you have used this product");
      setLoading(false);
      return;
    }

    if (!comment || comment.length < 50) {
      setError("Comment must be at least 50 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating: Number(rating),
          comment,
          recommend,
          productModel,
          usageDuration,
          proof,
          reviewer: "Anonymous User", // Hardcoded for now per requirements context
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setSuccess(true);
      // Optional: reset form
      setComment("");
      setProductModel("");
      setUsageDuration("");
      setFileName("");
      setProof("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="rounded-3xl bg-Grey-11 px-8 py-10 shadow-lg outline outline-Grey-2 text-center">
          <h2 className="text-xl font-bold mb-4">Review Submitted!</h2>
          <p className="text-Grey-2 mb-6">Thank you for sharing your experience.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded border border-Grey-2 bg-transparent px-6 py-2 text-Grey-2 font-bold hover:bg-white/5"
            >
              Go Back
            </button>
            <button
              onClick={() => setSuccess(false)}
              className="cursor-pointer rounded bg-black px-6 py-2 text-white font-bold"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="inline-flex w-72 flex-col items-center justify-center gap-6 rounded-3xl bg-Grey-11 px-4 py-6 outline-2 outline-offset-2 outline-Grey-2 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] lg:w-120 lg:gap-8 lg:px-8 lg:py-10 relative">
        {/* Back Button */}
        <div className="w-full flex justify-start">
          <button
            onClick={() => router.back()}
            className="cursor-pointer text-Grey-2 hover:text-black transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="flex w-full flex-col gap-2 self-start lg:gap-4">
          {/* Model */}
          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            Model
          </span>

          <label className="inline-flex items-center rounded px-2 py-1.5 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <input
              type="text"
              value={productModel}
              onChange={(e) => setProductModel(e.target.value)}
              placeholder="Redmi Note 15"
              className="w-full text-[10px] text-Grey-2 outline-none lg:text-[14px] lg:placeholder:text-[14px]"
            />
          </label>

          {/* Usage */}
          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            How long have you used this product?
            <span className="text-red-600">*</span>
          </span>

          <label className="inline-flex items-center rounded px-2 py-1.5 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <input
              type="text"
              value={usageDuration}
              onChange={(e) => setUsageDuration(e.target.value)}
              placeholder="1 month, 3 month, 1 year"
              className="w-full text-[10px] text-Grey-2 outline-none lg:text-[14px] lg:placeholder:text-[14px]"
            />
          </label>

          {/* Rating */}
          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
              Rate (1-5)
              <span className="text-red-600">*</span>
            </span>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="cursor-pointer w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 focus:outline-black lg:text-[14px]"
            >
              <option value="" disabled>
                Select rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          {/* Comment */}
          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            Comment (Minimum 50 characters)
            <span className="text-red-600">*</span>
          </span>

          <label className="inline-flex rounded px-2 py-1.5 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your real usage experience — what you liked, disliked, and any issues you faced."
              className="w-full resize-none bg-transparent text-[10px] text-Grey-2 outline-none placeholder:text-gray-400 lg:text-[14px] lg:placeholder:text-[14px]"
            />
          </label>

          {/* Recommend */}
          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
              Would you recommend this product?
              <span className="text-red-600">*</span>
            </span>

            <select
              value={recommend}
              onChange={(e) => setRecommend(e.target.value)}
              className="cursor-pointer w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {/* Upload */}
          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[10px] font-medium text-Grey-2 lg:text-[12px]">
              Upload (Receipt or any proof)*
            </span>

            <input
              id="upload-proof"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />

            <label
              htmlFor="upload-proof"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <img
                src="/product_info/upload.svg"
                alt="upload"
                className="h-4 w-4"
              />
              {fileName || "Upload your file"}
            </label>
          </label>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="cursor-pointer rounded bg-black px-3 py-1 text-sm font-bold text-white lg:py-3 lg:text-base disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
