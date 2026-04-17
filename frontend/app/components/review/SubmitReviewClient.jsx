"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";

export default function SubmitReviewClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setUser } = useAuth() || {};   
  const productId = searchParams.get("productId");
  const queryModel = searchParams.get("model") || "";

  const [rating, setRating] = useState("4");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState("Yes");
  const [productModel, setProductModel] = useState(queryModel);
  const [releaseDate, setReleaseDate] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [usageDuration, setUsageDuration] = useState("");
  const [fileName, setFileName] = useState("");
  const [proof, setProof] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);  
  const [newPoints, setNewPoints] = useState(0);               

  useEffect(() => {
    if (productId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((data) => {
          if (data && data.name) setProductModel(data.name);
          // Use releaseDate if available, otherwise fallback to createdAt
          if (data && data.releaseDate) {
            setReleaseDate(new Date(data.releaseDate));
          } else if (data && data.createdAt) {
            setReleaseDate(new Date(data.createdAt));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [productId]);

  // Update usageDuration string whenever purchaseDate changes
  useEffect(() => {
    if (purchaseDate) {
      const duration = formatDistanceToNow(purchaseDate);
      setUsageDuration(duration);
    } else {
      setUsageDuration("");
    }
  }, [purchaseDate]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // ✅ Added validation: check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid receipt (Image or PDF only)");
        e.target.value = null; // Reset input
        setFileName("");
        setProof("");
        return;
      }

      // ✅ Added validation: check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        e.target.value = null;
        setFileName("");
        setProof("");
        return;
      }

      setError("");
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
    if (!purchaseDate) { setError("Please specifying your purchase date"); setLoading(false); return; }
    
    // Final validation check (just in case)
    if (releaseDate && isBefore(startOfDay(purchaseDate), startOfDay(releaseDate))) {
      setError(`Purchase date cannot be before product release date (${releaseDate.toLocaleDateString()})`);
      setLoading(false);
      return;
    }

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
          purchaseDate,
          proof,
          reviewer: user?.name || "Anonymous User",
          userId: user?._id || null,
          reviewType: "update",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      if (data.pointsAwarded && user && setUser) {
        const updatedUser = { 
          ...user, 
          points: data.updatedPoints,
          reviewedProducts: data.updatedReviewedProducts || user.reviewedProducts,
          coupons: data.updatedCoupons || user.coupons || []
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setPointsAwarded(true);
        setNewPoints(data.updatedPoints);
      }

      setSuccess(true);
      setComment("");
      setProductModel("");
      setPurchaseDate(null);
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
              className="cursor-pointer rounded border border-Grey-2 bg-transparent px-6 py-2 text-Grey-2 font-bold hover:bg-white/5"
            >
              Go Back
            </button>
            <button
              onClick={() => { setSuccess(false); setPointsAwarded(false); }}
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
            When did you purchase this product?<span className="text-red-600">*</span>
          </span>
          <div className="relative w-full">
            <DatePicker
              selected={purchaseDate}
              onChange={(date) => {
                setPurchaseDate(date);
                setError(""); // Clear error on change
              }}
              placeholderText="Select purchase date"
              maxDate={new Date()}
              minDate={releaseDate}
              dateFormat="MMMM d, yyyy"
              onKeyDown={(e) => e.preventDefault()} // Disable manual typing
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={10}
              className="w-full rounded px-2 py-1.5 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 text-[10px] text-Grey-2 outline-none lg:text-[14px] lg:placeholder:text-[14px] bg-transparent"
              popperPlacement="bottom-start"
            />
            {usageDuration && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] lg:text-[10px] text-gray-400 pointer-events-none">
                {usageDuration} ago
              </span>
            )}
          </div>
          {releaseDate && (
            <span className="text-[7px] lg:text-[10px] text-gray-400 -mt-1">
              Note: This product was released on {releaseDate.toLocaleDateString()}
            </span>
          )}

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
            <input 
              id="upload-proof" 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload} 
              accept="image/*,.pdf" 
            />
            <label
              htmlFor="upload-proof"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <img src="/product_info/upload.svg" alt="upload" className="h-4 w-4" />
              {fileName || "Upload your file"}
            </label>
          </label>

          {error && (
            <div className="flex items-center gap-2 p-2 rounded-md bg-red-50 border border-red-200 text-red-600 animate-in fade-in slide-in-from-top-1 duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[10px] lg:text-xs font-medium">{error}</p>
            </div>
          )}

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