"use client";

import React, { useState } from "react";

function Search() {
  return (
    <div className="text-center">
      <div className="w-60 h-9 px-4 rounded-[60px] outline-1 outline-Grey-2 flex items-center gap-2">
        {/* Input field */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-sm"
        />

        {/* Search icon */}
        <img
          src="/homepage/search.svg"
          alt="search icon"
          className="w-5 h-5 hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="max-w-full px-4 py-3 md:px-6 md:py-6 lg:py-2 justify-between items-center">
      <div className="flex items-center w-full justify-between">
        {/* Left side of navigation */}
        <div className="flex gap-8 items-center">
          <button className="lg:hidden" onClick={toggleMenu}>
            <img
              src={isOpen ? "/homepage/close_ring.svg" : "/homepage/menu.svg"}
              alt="Menu toggle"
              className="w-6 h-6 md:w-9 md:h-9"
            />
          </button>
          <img
            src="/homepage/truloop_icon.svg"
            className="w-8 h-8 md:w-14 md:h-14 self-center"
            alt="truloop"
          />

          <div className="flex gap-1.75">
            <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
              <div className="text-center justify-center text-base font-medium leading-5">
                Home
              </div>
            </div>
            <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
              <div className="text-center justify-center text-Grey-2 text-base font-medium leading-5">
                Products
              </div>
            </div>
            {/* Desktop Navbar Search */}
            <div className="hidden lg:flex">
              <Search />
            </div>
          </div>
        </div>

        {/* Right side of navigation */}
        <div className="flex py-1 justify-center items-center gap-2.5 text-center font-roboto text-base font-medium md:text-xl lg:hidden">
          <button className="rounded-[2.8125rem] border-2 border-[#1A1A1A] px-3 py-1.5 md:px-4 md:py-2">
            Login
          </button>
          <button className="rounded-[2.8125rem] border-2 border-[#1A1A1A] bg-black text-white px-3 py-1.5 md:px-4 md:py-2">
            Signup
          </button>
        </div>

        {/* Profile icon */}
        <div className="hidden rounded-full lg:inline-flex items-center justify-center bg-black text-white w-12 hover:cursor-pointer aspect-square">
          N
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 font-medium">
          <div className="flex justify-center">{<Search />}</div>
          <button
            className="rounded-[2.8125rem] w-50 self-center border-2 border-[#1A1A1A] px-5 py-1.5"
            onClick={() => setIsOpen(false)}
          >
            Home
          </button>

          <button
            className="rounded-[2.8125rem] w-50 self-center border-2 border-[#1A1A1A] px-5 py-1.5"
            onClick={() => setIsOpen(false)}
          >
            Products
          </button>
          <button
            className="rounded-[2.8125rem] w-50 self-center border-2 border-[#1A1A1A] px-5 py-1.5"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <>
      <div className="lg:bg-[url(/homepage/background.png)]">
        <div className="self-stretch h-50 md:h-100 lg:h-[90vh] items-center flex justify-center bg-white opacity-90">
          <div className="p-3 inline-flex flex-col justify-start items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-center gap-0.75 md:gap-3">
              <div className="self-stretch text-center justify-start text-xl md:text-3xl lg:text-5xl font-bold leading-5">
                Reviews That Actually Tell You the Truth
              </div>
              <div className="w-56 text-center justify-start text-[6px] md:text-[15px] md:w-full md:px-2 lg:text-[25px] lg:w-[72%]">
                Explore genuine, verified, long-term opinions from users who
                share how their device performed over time - from durability and
                battery life to software stability.
              </div>
            </div>
            <div className="px-2.5 py-1.5 rounded inline-flex justify-center items-center gap-[2.50px]">
              <button className="bg-black rounded-sm text-white text-xs md:text-lg md:p-2.5 font-bold p-2 hover:cursor-pointer hover:bg-white hover:text-black border-2">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OurRole() {
  return (
    <div className="flex justify-center flex-col gap-12 mb-8 lg:my-15">
      <div className="text-center justify-start text-2xl md:text-3xl lg:text-5xl font-bold">
        How It Works
      </div>

      {/* Fututure Update: Foreach loop have to be implemented! using array*/}

      <div className="md:grid md:grid-cols-2 md:gap-0 place-items-center gap-6 flex flex-col-reverse">
        {/* Text */}
        <div className="flex flex-col justify-start items-start gap-4 px-4.5">
          <div className="flex flex-col justify-start items-start gap-1.5">
            <div className="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Submit
            </div>
            <div className="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
              Add your genuine review with proof - authenticated instantly.
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-1.5">
            <div className="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Earn
            </div>
            <div className="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
              Add your genuine review with proof - authenticated instantly.
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-1.5">
            <div className="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Update
            </div>
            <div className="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
              Add your genuine review with proof - authenticated instantly.
            </div>
          </div>
        </div>

        {/* Image */}
        <img class="h-60 rounded-[34px] px-4.5" src="/homepage/img.jpg" />
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Xiaomi Redmi Note 15",
    price: "20,000",
    image: "https://placehold.co/250x250",
    rating: 5,
  },
  {
    id: 2,
    name: "Xiaomi Redmi Note 14",
    price: "18,500",
    image: "https://placehold.co/250x250",
    rating: 4,
  },
  {
    id: 3,
    name: "Xiaomi Redmi Note 13",
    price: "16,999",
    image: "https://placehold.co/250x250",
    rating: 4,
  },
  {
    id: 4,
    name: "Xiaomi Redmi Note 12",
    price: "14,999",
    image: "https://placehold.co/250x250",
    rating: 3,
  },
];

function ProductCard({ product }) {
  return (
    <div>
      <div className="w-72 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch h-96 px-6 py-4 bg-Grey-11 rounded-3xl shadow-[1px_1px_10px_0px_rgba(204,204,204,1.00)] outline outline-4 outline-offset-[-3.50px] outline-Grey-2 flex flex-col justify-center items-center gap-4 overflow-hidden">
          
          <div className="flex flex-col justify-start items-center gap-4">
            <img
              className="w-64 h-64 rounded-[5px]"
              src={product.image}
              alt={product.name}
            />

            <div className="flex flex-col justify-start items-start gap-2">
              <div className="w-60 text-Grey-2 text-base font-medium leading-5">
                {product.name}
              </div>

              <div className="w-60 inline-flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="text-Grey-2 text-lg font-bold leading-8">
                    {product.price}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex">
                  {[...Array(product.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 relative">
                      <div className="w-3.5 h-3.5 absolute left-[2.81px] top-[3.07px] bg-Grey-2 outline outline-1 outline-offset-[-0.50px] outline-Grey-2" />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="w-72 pl-8 pr-9 py-2.5 bg-Grey-2 rounded-[50px] outline outline-[3px] outline-offset-[-3px] outline-Grey-2 inline-flex justify-center items-center gap-2">
          <div className="w-4 h-4 bg-Grey-11" />
          <div className="text-Grey-11 text-base font-medium leading-5">
            View Reviews
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedProducts() {
  return (
    <section className="flex flex-col items-center gap-16 my-16 w-full">
      
      {/* Heading */}
      <div className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Featured Products
      </div>

      {/* Cards Wrapper (THIS WAS MISSING) */}
      <div className="flex flex-wrap justify-center gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}


function Homepage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <OurRole />
      <FeaturedProducts />
    </>
  );
}

export default Homepage;
