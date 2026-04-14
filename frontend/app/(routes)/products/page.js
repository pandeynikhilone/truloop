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
  "Redmi",
  "Poco",
  "iQOO",
  "Realme",
  "Vivo",
  "Oppo",
  "Google Pixel",
  "Motorola",
  "Nothing",
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

// Separate stable component for filters to prevent unmounting issues on state changes
const FilterContent = ({
  selectedSort,
  setSelectedSort,
  selectedBrand,
  setSelectedBrand,
  selectedPriceLabel,
  setSelectedPriceLabel,
  searchQuery,
  clearFilters,
  sortOptions,
  brand,
  priceRanges
}) => {
  // Helper to handle radio selection with deselection support
  const handleRadioClick = (current, selected, setter, value) => {
    if (current === value) {
      setter("");
    } else {
      setter(value);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between lg:pe-6">
        <span className="flex text-lg font-bold py-6 px-3 md:px-5">
          Sort By
        </span>
        {(selectedSort || selectedBrand || selectedPriceLabel || searchQuery) && (
          <button onClick={clearFilters} className="text-sm underline cursor-pointer hover:text-gray-600 font-medium px-4">
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-col mx-auto px-5 lg:px-10 gap-2">
        {sortOptions.map((option) => (
          <div
            key={option}
            className="flex gap-3 items-center w-full cursor-pointer group select-none relative py-1"
            onClick={() => handleRadioClick(selectedSort, selectedSort === option, setSelectedSort, option)}
          >
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className={`w-5 h-5 border-2 rounded-full transition-colors duration-200 flex items-center justify-center ${selectedSort === option ? "border-black bg-white" : "border-gray-300"}`}>
                {selectedSort === option && (
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                )}
              </div>
            </div>
            <span className={`text-md transition-all duration-200 pointer-events-none ${selectedSort === option ? "font-bold text-black" : "text-gray-700 font-medium"}`}>
              {option}
            </span>
          </div>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-[90%] mx-auto border-gray-400" />
      <span className="flex text-lg font-bold py-3 md:py-6 px-3 md:px-5">
        Filter
      </span>
      <span className="flex text-md font-bold pl-7 pb-3">
        Brand
      </span>
      <div className="flex flex-col mx-auto px-9 lg:px-10 gap-1 mb-4">
        {brand.map((item) => (
          <div
            key={item}
            className="flex w-full items-center gap-3 cursor-pointer group select-none relative py-1"
            onClick={() => handleRadioClick(selectedBrand, selectedBrand === item, setSelectedBrand, item)}
          >
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className={`w-5 h-5 border-2 rounded-full transition-colors duration-200 flex items-center justify-center ${selectedBrand === item ? "border-black bg-white" : "border-gray-300"}`}>
                {selectedBrand === item && (
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                )}
              </div>
            </div>
            <span className={`text-sm md:text-base transition-all duration-200 pointer-events-none ${selectedBrand === item ? "font-bold text-black" : "text-gray-700 font-medium"}`}>
              {item}
            </span>
          </div>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-[90%] mx-auto border-gray-400" />
      <span className="flex text-lg font-bold py-6 px-3 md:px-5">
        Price Range
      </span>
      <div className="flex flex-col mx-auto px-5 lg:px-10 gap-2 mb-4">
        {priceRanges.map((range) => (
          <div
            key={range.label}
            className="flex items-center gap-3 cursor-pointer w-full group select-none relative py-1"
            onClick={() => handleRadioClick(selectedPriceLabel, selectedPriceLabel === range.label, setSelectedPriceLabel, range.label)}
          >
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className={`w-5 h-5 border-2 rounded-full transition-colors duration-200 flex items-center justify-center ${selectedPriceLabel === range.label ? "border-black bg-white" : "border-gray-300"}`}>
                {selectedPriceLabel === range.label && (
                  <div className="w-2.5 h-2.5 bg-black rounded-full" />
                )}
              </div>
            </div>
            <span className={`text-sm md:text-base transition-all duration-200 pointer-events-none ${selectedPriceLabel === range.label ? "font-bold text-black" : "text-gray-700 font-medium"}`}>
              {range.label}
            </span>
          </div>
        ))}
      </div>
      <hr className="opacity-20 mt-5 w-[90%] mx-auto pb-6 md:pb-0 border-gray-400" />
    </>
  );
};

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedSort, setSelectedSort] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceLabel, setSelectedPriceLabel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBrand, selectedSort, selectedPriceLabel, itemsPerPage]);

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

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sharedFilterProps = {
    selectedSort,
    setSelectedSort,
    selectedBrand,
    setSelectedBrand,
    selectedPriceLabel,
    setSelectedPriceLabel,
    searchQuery,
    clearFilters,
    sortOptions,
    brand,
    priceRanges
  };

  return (
    <div className="flex flex-col">
      <Navigation searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      {isOpen && (
        <div
          className={`fixed overflow-y-auto overflow-x-hidden top-30 right-0 max-w-75 w-full h-[75vh] rounded-bl-3xl rounded-tl-3xl bg-white shadow-[-2px_0_16px_0_#CCC] z-50 mt-4 flex flex-col font-medium transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
            } `}
        >
          <button className="p-3 flex w-full justify-start cursor-pointer hover:bg-gray-50 transition-colors" onClick={toggleMenu}>
            <img
              src={"/homepage/close_ring.svg"}
              alt="Menu toggle"
              className="w-10 aspect-square md:w-9 md:h-9"
            />
          </button>
          <div className="flex flex-col">
            <div className="p-3 w-full">
              <div className="lg:hidden w-full">
                <FilterContent {...sharedFilterProps} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center lg:hidden mt-4 px-4">
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="lg:w-[90%] mx-auto flex flex-col min-h-[60vh]">
        <div className="w-full flex md:justify-between">
          <div className="xl:w-[30%] hidden xl:block sticky top-30 h-fit">
            <FilterContent {...sharedFilterProps} />
          </div>
          <div className="flex flex-col w-full xl:w-[70%] lg:gap-4 my-5 px-3 sm:px-4 md:px-2">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-5 mb-3 gap-2 lg:gap-0">
              <span className="flex items-end gap-3 text-lg md:text-xl lg:text-2xl font-bold">
                Products
                {displayedProducts.length > 0 && (
                  <span className="text-sm text-gray-500 font-normal mb-1 hidden sm:inline-block">({displayedProducts.length} results)</span>
                )}
              </span>
              <div className="flex items-center justify-between lg:justify-end gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border-2 border-gray-300 rounded-lg p-1 px-2 cursor-pointer focus:outline-none focus:border-black font-medium"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                  </select>
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded-full border-2 border-[#1A1A1A] px-5 py-1.5 lg:hidden font-bold h-fit hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  Filter
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <Loader text="Loading amazing products..." />
            ) : displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit lg:w-full mx-auto md:mx-0 gap-1.5 gap-y-4 lg:gap-3">
                  {paginatedProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-10 mb-4 text-sm md:text-base">
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                    >
                      Previous
                    </button>
                    <span className="font-semibold text-lg">
                      {currentPage} <span className="font-normal text-gray-500">/ {totalPages}</span>
                    </span>
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border-2 border-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
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
