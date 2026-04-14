"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/app/components/common/Navigation";
import Footer from "@/app/components/common/Footer";
import CouponCard from "@/app/components/profile/CouponCard";
import Loader from "@/app/components/common/Loader";

function page() {
  const [open, setOpen] = useState(false);
  const { user, setUser, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && setUser) {
          const refreshed = {
            ...user,
            points: data.points ?? 0,
            reviewedProducts: data.reviewedProducts ?? [],
          };
          localStorage.setItem("user", JSON.stringify(refreshed));
          setUser(refreshed);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <Loader text="Loading profile..." />
        <div className="mt-auto"><Footer /></div>
      </div>
    );
  }

  const coupons = user.coupons || [];

  return (
    <>
      <Navigation />
      <div>
        <div className="min-h-screen flex justify-center items-center bg-white px-4 py-20">
          <div className="w-full max-w-xs flex flex-col gap-6">
            <h1 className="text-lg font-bold text-black">Profile Overview</h1>
            <div className="flex justify-center">
              <div className="w-30 aspect-square rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-22 aspect-square rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-black">Profile Name</label>
              <input
                type="text"
                value={user.name}
                className="w-full px-3 py-2 rounded border border-black text-sm outline-none"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-black">Email</label>
              <input
                type="text"
                value={user.email}
                className="w-full px-3 py-2 rounded border border-black text-sm outline-none"
                disabled
              />
            </div>
            {/* ✅ FIXED: was hardcoded as 50, now reads from user.points */}
            <div className="bg-black text-white rounded-lg px-4 py-3 flex justify-between items-center shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-wide">Total Points</span>
                <span className="text-[10px] text-gray-300">
                  Points convert into a reward once you reach the limit.
                </span>
              </div>
              <span className="text-2xl font-black">{user.points ?? 0}</span>
            </div>
            <div className="w-full">
              <button
                onClick={() => setOpen(!open)}
                className="w-full bg-black text-white cursor-pointer px-4 py-3 rounded-lg flex justify-between items-center hover:bg-black/90 transition-all shadow-md"
              >
                <span className="text-sm font-semibold uppercase tracking-widest">Your Coupons</span>
                <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                  <img src="/user_profile/dropdown.svg" />
                </span>
              </button>
              {open && (
                <div className="mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  {coupons.length > 0 ? (
                    coupons.map((coupon, index) => (
                      <CouponCard 
                        key={index}
                        discount={coupon.discount}
                        code={coupon.code}
                        expiryDate={coupon.expiryDate}
                      />
                    ))
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-xs text-gray-400 font-medium italic">No coupons earned yet. Submit your first review to get one!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={logout}
              className="self-start cursor-pointer bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-red-600 transition-colors shadow-sm"
            >
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