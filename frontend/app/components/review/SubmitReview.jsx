"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SubmitReview() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setUser } = useAuth() || {};   
  const productId = searchParams.get("productId");
  const queryModel = searchParams.get("model") || "";

  const [rating, setRating] = useState("4");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState("Yes");
  const [productModel, setProductModel] = useState(queryModel);
  const [usageDuration, setUsageDuration] = useState("");
  const [fileName, setFileName] = useState("");
  const [proof, setProof] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);  
  const [newPoints, setNewPoints] = useState(0);               

  useEffect(() => {
    if (productId && !productModel) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((data) => {
          if (data && data.name) setProductModel(data.name);
        })
        .catch((err) => console.error(err));
    }
  }, [productId, productModel]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setProof(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!productId) { setError("Product ID missing"); setLoading(false); return; }
    if (!usageDuration) { setError("Please specify how long you have used this product"); setLoading(false); return; }
    if (!comment || comment.length < 50) { setError("Comment must be at least 50 characters"); setLoading(false); return; }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: Number(rating),
          comment,
          recommend,
          productModel,
          usageDuration,
          proof,
          reviewer: user?.name || "Anonymous User",
          userId: user?._id || null,
          reviewType: "initial",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      if (data.pointsAwarded && user && setUser) {
        const updatedUser = { 
          ...user, 
          points: data.updatedPoints,
          reviewedProducts: data.updatedReviewedProducts || user.reviewedProducts
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setPointsAwarded(true);
        setNewPoints(data.updatedPoints);
      }

      setSuccess(true);
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
        <div className="rounded-3xl bg-Grey-11 px-8 py-10 shadow-lg outline outline-Grey-2 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-2">Review Submitted!</h2>
          <p className="text-Grey-2 mb-4">Thank you for sharing your experience.</p>

          {/* ✅ ADDED: Points banner */}
          {pointsAwarded ? (
            <div className="mb-6 bg-black text-white rounded-xl px-5 py-4 flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold">+50 Points Earned!</span>
              <span className="text-sm text-gray-300">Total Points: <strong>{newPoints}</strong></span>
            </div>
          ) : user ? (
            <div className="mb-6 bg-gray-100 text-gray-500 rounded-xl px-5 py-3 text-sm">
              You already earned points for this product.
            </div>
          ) : null}

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded bg-black px-8 py-2 text-white font-bold hover:bg-black/90 transition-colors"
            >
              Go Back to Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="inline-flex w-72 flex-col items-center justify-center gap-6 rounded-3xl bg-Grey-11 px-4 py-6 outline-2 outline-offset-2 outline-Grey-2 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] lg:w-120 lg:gap-8 lg:px-8 lg:py-10 relative">
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
          <div className="text-[10px] lg:text-xs text-gray-500 bg-black/5 p-2 rounded-md flex items-center justify-between mb-2">
            <span>Reviewing as: <strong className="text-black">{user?.name || "Anonymous User"}</strong></span>
            {user && (
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <img src="/product_info/verified.svg" className="w-3.5 h-3.5" alt="Verified" />
                Verified
              </span>
            )}
          </div>

          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">Model</span>
          <label className="inline-flex items-center rounded px-2 py-1.5 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 bg-gray-50/5">
            <input
              type="text"
              value={productModel}
              readOnly
              placeholder={productModel ? "" : "Loading model..."}
              className="w-full cursor-not-allowed bg-transparent text-[10px] text-Grey-2 outline-none lg:text-[14px] lg:placeholder:text-[14px]"
            />
          </label>

          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            How long have you used this product?<span className="text-red-600">*</span>
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

          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
              Rate (1-5)<span className="text-red-600">*</span>
            </span>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="cursor-pointer w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 focus:outline-black lg:text-[14px]"
            >
              <option value="" disabled>Select rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>

          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            Comment (Minimum 50 characters)<span className="text-red-600">*</span>
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

          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
              Would you recommend this product?<span className="text-red-600">*</span>
            </span>
            <select
              value={recommend}
              onChange={(e) => setRecommend(e.target.value)}
              className="cursor-pointer w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <option value="" disabled>Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 lg:gap-2">
            <span className="text-[10px] font-medium text-Grey-2 lg:text-[12px]">
              Upload (Receipt or any proof)*
            </span>
            <input id="upload-proof" type="file" className="hidden" onChange={handleFileUpload} />
            <label
              htmlFor="upload-proof"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <img src="/product_info/upload.svg" alt="upload" className="h-4 w-4" />
              {fileName || "Upload your file"}
            </label>
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

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
