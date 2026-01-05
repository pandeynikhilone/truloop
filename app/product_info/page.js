"use client";

import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import RatingsReviews from "./RatingsReviews";
import ReviewsList from "./ReviewsList";
import Card from "../components/Card";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Xiaomi Redmi Note 15",
    price: "20,000",
    image: "./homepage/rectangle.svg",
    rating: 5,
  },
  {
    id: 2,
    name: "Xiaomi Redmi Note 14",
    price: "18,500",
    image: "/homepage/rectangle.svg",
    rating: 4,
  },
  {
    id: 3,
    name: "Xiaomi Redmi Note 13",
    price: "16,999",
    image: "/homepage/rectangle.svg",
    rating: 4,
  },
  {
    id: 4,
    name: "Xiaomi Redmi Note 12",
    price: "14,999",
    image: "/homepage/rectangle.svg",
    rating: 3,
  },
];

function page() {
  return (
    <>
      <Navigation />
      <div>
        <div className="flex flex-col my-11 justify-around lg:flex-row p-5">
          <div className="justify-items-center lg:w-[40%]">
            <img
              className="h-75 lg:h-115 lg:w-130"
              src="/homepage/rectangle.svg"
            />
          </div>
          <div className="flex flex-col lg:w-[35%] gap-10">
            {/* Product Info */}
            <div className="flex flex-col gap-4">
              {/* Title & Rating */}
              <div className="flex flex-col gap-2">
                <h1 className="text-Grey-2 text-xl lg:text-3xl font-bold leading-7">
                  Xiaomi Redmi Note 15
                </h1>

                <div className="flex gap-1.5">
                  <span className="px-2.5 py-0.5 outline-2 rounded-[55px] text-white bg-black text-xs lg:text-sm lg:px-3 lg:py-1 font-medium">
                    4.1
                  </span>

                  <div className="px-2.5 py-0.5 outline-2 rounded-[55px] text-white bg-black text-xs lg:text-sm lg:px-3 lg:py-1 font-medium">
                    82 Reviews
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-Grey-2 text-xl lg:text-2xl font-bold leading-7">
                20,000
              </div>
            </div>

            {/* Key Specifications */}
            <div className="flex flex-col">
              <button className="px-3 py-1 bg-black text-white rounded text-sm lg:text-md font-bold w-fit">
                Key Specifications
              </button>

              <div className="flex flex-col gap-1 text-xs lg:text-sm text-Grey-2 mt-4 mb-10">
                <div className="flex gap-2">
                  <span className="font-bold w-fit">OS:</span>
                  <span>Android 15, HyperOS</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Product Dimensions:</span>
                  <span>165 × 75.4 × 7.4 mm</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Display:</span>
                  <span>6.77″ AMOLED, 120Hz, 3200 nits</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Processor:</span>
                  <span>Snapdragon 6 Gen 3 (4 nm)</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Memory:</span>
                  <span>128GB 6GB / 8GB RAM</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Battery:</span>
                  <span>Li-Ion 5800 mAh</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold w-fit">Camera:</span>
                  <span>Rear 50 MP, Front 8 MP</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={"/submit_review"}>
                  <button className="cursor-pointer px-3 py-1 gap-2 bg-black text-white rounded-full text-sm lg:text-[15px] lg:px-4 lg:py-2 font-bold w-fit flex">
                    <img
                      className="w-3.75"
                      src="/product_info/submit_review.svg"
                    />
                    Submit Review
                  </button>
                </Link>
                <button className="cursor-pointer px-3 py-1 gap-2 bg-black text-white rounded-full text-sm lg:text-[15px] lg:px-4 lg:py-2 font-bold w-fit flex">
                  <img className="w-3.75" src="/product_info/add_update.svg" />
                  Add Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <RatingsReviews />
        <ReviewsList />
        <div className="my-10 md:px-10 flex flex-col gap-8 lg:mb-25 lg:mt-12">
          <div className="flex w-full justify-center text-center text-2xl md:text-3xl lg:text-4xl lg:justify-center font-bold">
            Same Brand Products
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 w-fit mx-auto gap-1.5 gap-y-4 lg:gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
