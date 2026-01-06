"use client";
import React from "react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CouponCard from "./CouponCard";

function page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navigation />
      <div>
        <div className="min-h-screen flex justify-center items-center bg-white px-4">
          <div className="w-full max-w-xs flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-lg font-bold text-black">Profile Overview</h1>
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-30 aspect-square rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-22 aspect-square rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">N</span>
                </div>
              </div>
            </div>
            {/* Profile Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-black">
                Profile Name
              </label>
              <input
                type="text"
                value="Nikhil Pandey"
                className="w-full px-3 py-2 rounded border border-black text-sm outline-none"
                disabled
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-black">Email</label>
              <input
                type="text"
                value="nikhilpandey@gmail.com"
                className="w-full px-3 py-2 rounded border border-black text-sm outline-none"
                disabled
              />
            </div>
            {/* Points Card */}
            <div className="bg-black text-white rounded-lg px-4 py-3 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Total Points</span>
                <span className="text-[10px] text-gray-300">
                  Points convert into a reward once you reach the limit.
                </span>
              </div>
              <span className="text-xl font-bold">50</span>
            </div>
            {/* Coupons Dropdown */}
            <div className="w-full">
              {/* Header */}
              <button
                onClick={() => setOpen(!open)}
                className="w-full bg-black text-white cursor-pointer px-4 py-3 rounded-lg flex justify-between items-center"
              >
                <span className="text-sm font-semibold">Your Coupons</span>
                <span
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                >
                  <img src="/user_profile/dropdown.svg"/>
                </span>
              </button>

              {/* Coupons */}
              {open && (
                <div className="mt-4 flex flex-col gap-4">
                  <CouponCard/>
                  <CouponCard />
                </div>
              )}
            </div>
            
            {/* Sign Out */}
            <button className="self-start cursor-pointer bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
              <img src="/user_profile/sign_out.svg" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
