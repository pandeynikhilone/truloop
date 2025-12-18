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
        <div className="flex gap-6 items-center">
          <button className="lg:hidden" onClick={toggleMenu}>
            <img
              src={
                isOpen
                  ? "/homepage/close_ring.svg"
                  : "/homepage/menu.svg"
              }
              alt="Menu toggle"
              className="w-6 h-6 md:w-9 md:h-9"
            />
          </button>
          <img
            src="/homepage/truloop_icon.svg"
            className="w-8 h-8 md:w-14 md:h-14 self-center"
            alt="truloop"
          />

          <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-Grey-2 text-base font-medium leading-5">Home</div>
          </div>
          <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-Grey-2 text-base font-medium leading-5">Products</div>
          </div>
          <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-Grey-2 text-base font-medium leading-5">Profile</div>
          </div>
          {/* Desktop Navbar Search */}
          <div className="hidden lg:flex">
            <Search />
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
        <div className="hidden rounded-full lg:inline-flex items-center justify-center bg-black text-white w-12 hover:cursor-pointer aspect-square">N</div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 font-medium">
          <div className="flex justify-center">
            {<Search />}
          </div>
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

function Homepage() {
  return (
    <>
      <Navigation />
    </>
  );
}

export default Homepage;
