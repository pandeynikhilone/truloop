"use client";
import Navigation from "@/app/components/common/Navigation";
import Card from "@/app/components/common/Card";
import Search from "@/app/components/common/Search";
import Footer from "@/app/components/common/Footer";
import Loader from "@/app/components/common/Loader";

import React, { useEffect, useState, useMemo } from "react";

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
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedSort, setSelectedSort] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceLabel, setSelectedPriceLabel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("q")) {
        setSearchQuery(params.get("q"));
      }
    }
  }, []);

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
          brand: item.brand,
          createdAt: item.createdAt,
          reviewCount: item.reviewCount,
          price: item.price, 
          images: item.images, 
          rating: Math.round(item.averageRating || 0),
          averageRating: item.averageRating || 0,
        }));

        setAllProducts(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setSelectedSort("");
    setSelectedBrand("");
    setSelectedPriceLabel("");
    setSearchQuery("");
  };

  const displayedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (p) => p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by brand
    if (selectedBrand) {
      result = result.filter(
        (p) => p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by price
    if (selectedPriceLabel) {
      const range = priceRanges.find((r) => r.label === selectedPriceLabel);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    // Sort
    switch (selectedSort) {
      case "Newest Devices":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Price - Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price - High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Highest Long-Term Rating":
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "Most Reviewed":
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, selectedSort, selectedBrand, selectedPriceLabel, searchQuery]);

  // Unified component so modifications are automatically reflected in both mobile and desktop views
  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between lg:pe-6">
        <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-3 md:px-5">
          Sort By
        </span>
        {(selectedSort || selectedBrand || selectedPriceLabel || searchQuery) && (
          <button onClick={clearFilters} className="text-sm underline cursor-pointer hover:text-gray-600 font-medium">
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-col mx-auto px-5 lg:px-10 gap-2">
        {sortOptions.map((option) => (
          <label
            key={option}
            className="flex gap-2 items-center w-fit cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              className="accent-black"
              checked={selectedSort === option}
              onChange={() => setSelectedSort(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-75 mx-auto" />
      <span className="flex text-md md:text-lg lg:text-xl font-bold py-3 md:py-6 px-3 md:px-5">
        Filter
      </span>
      <span className="flex text-sm md:text-md lg:text-lg font-bold pl-7 pb-3">
        Brand
      </span>
      <div className="flex flex-col mx-auto px-9 lg:px-10 text-sm md:text-base">
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
              checked={selectedBrand === item}
              onChange={() => setSelectedBrand(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-75 mx-auto" />
      <span className="flex text-md md:text-lg lg:text-xl font-bold py-6 px-3 md:px-5">
        Price Range
      </span>
      <div className="flex flex-col mx-auto px-5 lg:px-10 text-sm md:text-base gap-2">
        {priceRanges.map((range) => (
          <label
            key={range.label}
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <input
              type="radio"
              name="price"
              className="accent-black"
              checked={selectedPriceLabel === range.label}
              onChange={() => setSelectedPriceLabel(range.label)}
            />
            {range.label}
          </label>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-75 mx-auto pb-6 md:pb-0" />
    </>
  );

  return (
    <div className="flex flex-col">
      <Navigation searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      {isOpen && (
        <div
          className={`fixed overflow-y-auto overflow-x-hidden top-30 right-0 max-w-75 w-full h-[75vh] rounded-bl-3xl rounded-tl-3xl bg-white shadow-[-2px_0_16px_0_#CCC] z-50 mt-4 flex flex-col font-medium transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
            } `}
        >
          <button className="lg:hidden p-3 flex w-full justify-start" onClick={toggleMenu}>
            <img
              src={"/homepage/close_ring.svg"}
              alt="Menu toggle"
              className="w-10 aspect-square md:w-9 md:h-9"
            />
          </button>
          <div className="flex flex-col">
            <div className="flex p-3 w-full">
              <div className="lg:hidden w-full">
                <FilterContent />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center lg:hidden mt-4">
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="lg:w-[90%] mx-auto flex flex-col min-h-[60vh]">
        <div className="w-full flex md:justify-between">
          <div className="xl:w-[30%] hidden xl:block">
            <FilterContent />
          </div>
          <div className="flex flex-col w-full xl:w-[70%] lg:gap-4 my-5 px-3 sm:px-4 md:px-2">
            <div className="flex items-center justify-between lg:justify-start">
              <span className="flex items-end gap-3 text-lg md:text-xl lg:text-2xl font-bold mt-5 mb-3">
                Products
                {displayedProducts.length > 0 && (
                  <span className="text-sm text-gray-500 font-normal mb-1 hidden sm:inline-block">({displayedProducts.length} results)</span>
                )}
              </span>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-[2.8125rem] border-2 border-[#1A1A1A] px-3 py-0.5 md:px-4 md:py-2 lg:hidden font-bold h-fit mt-2"
              >
                Filter
              </button>
            </div>
            
            {isLoading ? (
              <Loader text="Loading amazing products..." />
            ) : displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit lg:w-full mx-auto md:mx-0 gap-1.5 gap-y-4 lg:gap-3">
                {displayedProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-xl font-semibold mb-2 text-black">No products found</p>
                <p className="text-sm text-center">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="mt-5 px-5 py-2 bg-black text-white rounded-full text-sm font-bold shadow hover:bg-gray-800 transition-colors cursor-pointer">
                  Clear Filters
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
