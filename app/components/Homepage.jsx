"use client";

import React, { useState } from "react";

function Search() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[90%] lg:w-full h-9 px-4 rounded-[60px] outline-1 outline-Grey-2 flex items-center gap-2">
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
              src={"/homepage/menu.svg"}
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
        <div
          className={`
    fixed top-0 left-0
    max-w-75 h-[90vh] p-[30px] gap-6
    rounded-tr-[1.5rem] rounded-br-[1.5rem]
    bg-white shadow-[-2px_0_16px_0_#CCC]
    z-50 mt-4
    flex flex-col font-medium

    transform transition-transform duration-500 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <div className="flex flex-col gap-15">
            <div className="flex items-center justify-between">
              <div>
                <img
                  src="/homepage/truloop_icon.svg"
                  className="w-13 aspect-square md:w-14 md:h-14 self-center"
                  alt="truloop"
                />
              </div>
              <div>
                <button
                  className="lg:hidden flex w-full justify-end"
                  onClick={toggleMenu}
                >
                  <img
                    src={"/homepage/close_ring.svg"}
                    alt="Menu toggle"
                    className="w-9 h-9 md:w-9 md:h-9"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <button
                className="px-10 w-full py-4 outline outline-[0.60px] outline-Grey-10 inline-flex justify-start items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                Home
              </button>

              <button
                className="px-10 py-4 outline outline-[0.60px] outline-Grey-10 inline-flex justify-start items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                Products
              </button>

              <button
                className="px-10 py-4 outline outline-[0.60px] outline-Grey-10 inline-flex justify-start items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <>
      <div className="flex justify-center lg:hidden">{<Search />}</div>
      <div className="lg:bg-[url(/homepage/background.png)]">
        <div className="self-stretch mt-4 h-45 md:h-100 lg:h-[90vh] items-center flex justify-center bg-white opacity-90">
          <div className="p-3 inline-flex flex-col justify-start items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-center gap-2 md:gap-3">
              <div className="w-[250px] md:w-full text-center justify-start text-xl md:text-3xl lg:text-5xl font-bold leading-5">
                Reviews That Actually Tell You the Truth
              </div>
              <div className="w-[90%] text-center justify-start text-[12px] md:text-[15px] md:w-full md:px-2 lg:text-[25px] lg:w-[72%]">
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
        <div className="flex flex-col justify-start items-start gap-4 px-2">
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
        <img class="h-53 w-80 block rounded-2xl lg:w-[38.125rem] lg:h-[17.5rem] px-4.5" src="/homepage/img.svg" />
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Xiaomi Redmi Note 15",
    price: "20,000",
    image: "/homepage/rectangle.svg",
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

function ProductCard({ product }) {
  return (
    <div className="flex flex-col items-center border-3 p-2 rounded-2xl">
      <div className="h-[200px] lg:w-[250px] lg:h-[325px] flex flex-col justify-center items-center">
        <div>
          <img
            className="aspect-square w-[130px] lg:w-[210px]"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="whitespace-nowrap text-sm lg:text-lg">
          <div>{product.name}</div>
          <div className="flex justify-between">
            <div>{product.price}</div>
            <div className="self-center">
              <img src="/homepage/icon/star_light.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[80%] bg-black rounded-[9px] md:mb-3 lg:mb-4.5 hover:bg-white border-2">
        <span className="text-white text-sm w-full text-center lg:text-lg p-1 hover:text-black hover:cursor-pointer">
          view product
        </span>
      </div>
    </div>
  );
}

function FeaturedProducts() {
  return (
    <div className="my-10 md:px-10 flex flex-col gap-8">
      <div className="flex w-full text-center justify-center mb-4 text-2xl md:text-3xl lg:text-5xl font-bold">
        Featured Products
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-fit mx-auto gap-1.5 gap-y-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function TrustUs() {
  return (
    <div className="flex justify-center flex-col gap-12 mb-8 lg:my-15 w-full">
      <div className="text-center justify-start text-2xl md:text-3xl lg:text-5xl font-bold">
        Why Trust Us
      </div>

      {/* Fututure Update: Foreach loop have to be implemented! using array*/}

      <div className="md:grid md:grid-cols-2 md:gap-0 place-items-center mx-auto gap-6 flex flex-col-reverse">
        {/* Text */}
        <div className="w-[80%] flex flex-col gap-8">
          <div className="text-left md:text-left text-[12px]">
            Our platform is built for transparency and honesty. Every review is
            verified, updated over time, and shared by people who have genuinely
            purchased and used the product, ensuring reliable and meaningful
            information.
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <img src="/homepage/icon/check_ring.png" alt="" />
              <span>Long-Term Usage Insights</span>
            </div>
            <div className="flex gap-2">
              <img src="/homepage/icon/check_ring.png" alt="" />
              <span>Long-Term Usage Insights</span>
            </div>
            <div className="flex gap-2">
              <img src="/homepage/icon/check_ring.png" alt="" />
              <span>Long-Term Usage Insights</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <img
          class="h-53 w-80 block rounded-2xl lg:w-[38.125rem] lg:h-[17.5rem]"
          src="/homepage/trust.svg"
        />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-[320px] mx-auto md:w-full lg:w-full py-4 md:px-20">
      <div className="flex items-center justify-between">
        <div>
          <img
            src="/homepage/truloop_icon.svg"
            className="w-8 h-8 md:w-14 md:h-14 self-center"
            alt="truloop"
          />
        </div>
        <div className="gap-4 flex">
          <span className="hover:cursor-pointer">Home</span>
          <span className="hover:cursor-pointer">Terms</span>
          <span className="hover:cursor-pointer">Socials</span>
        </div>
        <div className="flex gap-1 md:gap-3">
          <img className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]" src="/homepage/icon/insta.svg" alt="" />
          <img className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]" src="/homepage/icon/insta.svg" alt="" />
          <img className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]" src="/homepage/icon/insta.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

function Homepage() {
  return (
    <div className="relative z-0">
      <Navigation />
      <HeroSection />
      <OurRole />
      <FeaturedProducts />
      <TrustUs />
      <Footer />
    </div>
  );
}

export default Homepage;
