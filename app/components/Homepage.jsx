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
    <div className="flex justify-center flex-col gap-5 lg:h-80 mb-15 mt-4">
      <div class="text-center justify-start text-2xl md:text-3xl lg:text-5xl font-bold">
        How It Works
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-0 place-items-center gap-6 flex flex-col-reverse">
        {/* Text */}
        <div class="w-80 flex flex-col justify-start items-start gap-4 px-4.5">
          <div class="flex flex-col justify-start items-start gap-1.5">
            <div class="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Submit
            </div>
            <div class="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
              Add your genuine review with proof - authenticated instantly.
            </div>
          </div>
          <div class="flex flex-col justify-start items-start gap-1.5">
            <div class="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Submit
            </div>
            <div class="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
              Add your genuine review with proof - authenticated instantly.
            </div>
          </div>
          <div class="flex flex-col justify-start items-start gap-1.5">
            <div class="px-2 py-1 bg-black text-white rounded-sm text-xs md:text-sm lg:text-lg font-bold">
              Submit
            </div>
            <div class="justify-start text-Grey-2 text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap">
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
function Homepage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <OurRole />
    </>
  );
}

export default Homepage;
