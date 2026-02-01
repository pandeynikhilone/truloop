"use client";
import Navigation from "@/app/components/common/Navigation";
import Card from "@/app/components/common/Card";
import Search from "@/app/components/common/Search";
import Footer from "@/app/components/common/Footer";

import React, { useEffect, useState } from "react";

const sortOptions = [
  "Most Reviewed",
  "Highest Long-Term Rating",
  "Newest Devices",
  "Price - Low to High",
  "Price - High to Low",
];

const brand = [
  "Samsung",
  "Apple",
  "OnePlus",
  "Xiaomi",
  "Redmi",
  "Poco",
  "iQOO",
  "Realme",
  "Vivo",
  "Oppo",
  "Google Pixel",
  "Motorola",
  "Nothing",
  "Asus",
  "Lava",
];

const priceRanges = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹15,000", min: 10000, max: 15000 },
  { label: "₹15,000 – ₹20,000", min: 15000, max: 20000 },
  { label: "₹20,000 – ₹30,000", min: 20000, max: 30000 },
  { label: "₹30,000 – ₹40,000", min: 30000, max: 40000 },
  { label: "₹40,000 – ₹50,000", min: 40000, max: 50000 },
  { label: "₹50,000+", min: 50000, max: Infinity },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // 🔁 Normalize backend → frontend shape
        const normalized = data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price, // until you add price in DB
          images: item.images, // Use images array for Cloudinary URLs
          rating: Math.round(item.averageRating || 0),
        }));

        setProducts(normalized);
      } catch (err) {
        console.error(err);
      }

      // Currently didn't need loading state.
      // finally {
      //   setLoading(false);
      // }
    }

    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col">
      <Navigation />
      {isOpen && (
        <div
          className={`fixed overflow-y-scroll overflow-x-hidden top-30 right-0 max-w-75 h-[75vh] rounded-bl-3xl rounded-tl-3xl bg-white shadow-[-2px_0_16px_0_#CCC] z-50 mt-4 flex flex-col font-medium transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
            } `}
        >
          <button className="lg:hidden p-3 flex w-full" onClick={toggleMenu}>
            <img
              src={"/homepage/close_ring.svg"}
              alt="Menu toggle"
              className="w-10 aspect-square md:w-9 md:h-9"
            />
          </button>
          <div className="flex flex-col gap-15">
            <div className="flex p-3">
              <div className="lg:w-[30%] lg:hidden">
                <span className="flex text-md md:text-lg lg:text-xl bg font-bold pb-6 px-3">
                  Sort By
                </span>
                <div className="flex flex-col mx-auto px-5 text-sm gap-2">
                  {sortOptions.map((option) => (
                    <label
                      key={option}
                      className="flex gap-2 items-center w-fit cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sort"
                        className="accent-black"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <hr className="opacity-20 mt-5 w-75 mx-auto" />
                <span className="flex text-md md:text-lg lg:text-xl font-bold py-3 px-3">
                  Filter
                </span>
                <span className="flex text-sm md:text-md lg:text-lg font-bold pl-7 pb-3">
                  Brand
                </span>
                <div className="flex flex-col mx-auto px-9 text-sm">
                  {brand.map((item) => (
                    <label
                      key={item}
                      className="flex w-fit items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="brand"
                        value={item}
                        className="accent-black"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <hr className="opacity-20 mt-5 w-75 mx-auto" />
                <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-2">
                  Price Range
                </span>
                <div className="flex flex-col mx-auto px-5 text-sm gap-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <input
                        type="radio"
                        name="price"
                        className="accent-black"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
                <hr className="opacity-20 mt-5 w-75 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center lg:hidden">{<Search />}</div>
      <div className="lg:w-[90%] mx-auto flex flex-col">
        <div className="w-full flex justify-between">
          <div className="xl:w-[30%] hidden xl:block">
            <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-5">
              Sort By
            </span>
            <div className="flex flex-col mx-auto px-10 gap-2">
              {sortOptions.map((option) => (
                <label
                  key={option}
                  className="flex gap-2 items-center w-fit cursor-pointer"
                >
                  <input type="radio" name="sort" className="accent-black" />
                  {option}
                </label>
              ))}
            </div>
            <hr className="opacity-20 mt-5 w-75 mx-auto" />
            <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-5">
              Filter
            </span>
            <span className="flex text-sm md:text-md lg:text-lg font-bold pl-7 pb-3">
              Brand
            </span>
            <div className="flex flex-col mx-auto px-10">
              {brand.map((item) => (
                <label
                  key={item}
                  className="flex w-fit items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="brand"
                    value={item}
                    className="accent-black"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <hr className="opacity-20 mt-5 w-75 mx-auto" />
            <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-5">
              Price Range
            </span>
            <div className="flex flex-col mx-auto px-10 gap-2">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center gap-2 cursor-pointer w-fit"
                >
                  <input type="radio" name="price" className="accent-black" />
                  {range.label}
                </label>
              ))}
            </div>
            <hr className="opacity-20 mt-5 w-75 mx-auto" />
          </div>
          <div className="flex flex-col w-full xl:w-[70%] lg:gap-4 my-5">
            <div className="flex items-center">
              <span className="flex text-lg md:text-xl lg:text-2xl font-bold mt-5 w-full mb-3">
                Products
              </span>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-[2.8125rem] border-2 border-[#1A1A1A] px-3 py-0.5 md:px-4 md:py-2 lg:hidden"
              >
                Filter
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit mx-auto gap-1.5 gap-y-4">
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
