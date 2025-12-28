"use client";

import React, { useState } from "react";

function Page() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="inline-flex w-72 flex-col items-center justify-center gap-6 rounded-3xl bg-Grey-11 px-4 py-6 outline outline-2 outline-offset-2 outline-Grey-2 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] lg:w-[30rem] lg:gap-8 lg:px-8 lg:py-10">
        <div className="flex w-full flex-col gap-2 self-start lg:gap-4">
          {/* Model */}
          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            Model
          </span>

          <label className="inline-flex items-center rounded px-2 py-1.5 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <input
              type="text"
              placeholder="Redmi Note 15"
              className="w-full text-[10px] text-Grey-2 outline-none lg:text-[14px] lg:placeholder:text-[14px]"
            />
          </label>

          {/* Usage */}
          <span className="text-[8px] font-bold leading-3 text-Grey-2 lg:text-[12px]">
            How long have you used this product?
            <span className="text-red-600">*</span>
          </span>

          <label className="inline-flex items-center rounded px-2 py-1.5 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <input
              type="text"
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
              defaultValue="4"
              className="w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 focus:outline-black lg:text-[14px]"
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

          <label className="inline-flex rounded px-2 py-1.5 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2">
            <textarea
              rows={2}
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
              defaultValue="Yes"
              className="w-full rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
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
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />

            <label
              htmlFor="upload-proof"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-[10px] text-Grey-2 outline outline-[1.26px] outline-offset-[-1.26px] outline-Grey-2 lg:text-[14px]"
            >
              <img src="/product_info/upload.svg" alt="upload" className="h-4 w-4" />
              {fileName || "Upload your file"}
            </label>
          </label>

          {/* Submit */}
          <button className="rounded bg-black px-3 py-1 text-sm font-bold text-white lg:py-3 lg:text-base">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
