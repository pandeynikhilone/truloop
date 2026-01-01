"use client";

import React, { useState } from "react";
import Search from "./Search";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="max-w-full px-4 py-3 md:px-6 md:py-6 lg:py-2 justify-between items-center">
      <div className="flex items-center w-full justify-between">
        {/* Left side of navigation */}
        <div className="flex gap-3 items-center">
          <button className="lg:hidden" onClick={toggleMenu}>
            <img
              src={"/homepage/menu.svg"}
              alt="Menu toggle"
              className="w-9 aspect-square md:w-9 md:h-9"
            />
          </button>
          <Link href={"/"}>
            <img
              src="/homepage/truloop_icon.svg"
              className="w-12 aspect-square md:w-14 md:h-14 self-center"
              alt="truloop"
            />
          </Link>
          <div className="flex gap-1.75">
            <Link href={"/"}>
              <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
                <div className="text-center justify-center text-base font-medium leading-5">
                  Home
                </div>
              </div>
            </Link>
            <Link href={"/products"}>
              <div className="hidden self-center px-5 py-1 rounded-[45px] w-25 h-8.5 outline-2 -outline-offset-2 outline-Grey-2 hover:text-white hover:bg-black hover:cursor-pointer transform ease-in duration-150 lg:inline-flex justify-center items-center gap-2.5">
                <div className="text-center justify-center text-Grey-2 text-base font-medium leading-5">
                  Products
                </div>
              </div>
            </Link>
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
        <Link href={"../profile"}>
        <div className="hidden rounded-full lg:inline-flex items-center justify-center bg-black text-white w-12 hover:cursor-pointer aspect-square">
          N
        </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 max-w-75 h-[90vh] w-62.5  gap-6 rounded-tr-3xl rounded-br-3xl bg-white shadow-[-2px_0_16px_0_#CCC] z-50 mt-4 flex flex-col font-medium transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } `}
        >
          <div className="flex flex-col gap-15">
            <div className="flex justify-between p-3">
              <div>
                <img
                  src="/homepage/truloop_icon.svg"
                  className="w-18 mt-2 aspect-square md:w-14 md:h-14 self-center"
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
                    className="w-10 aspect-square md:w-9 md:h-9"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <hr className="inline-block opacity-8" />
              <Link href={"/"}>
                <button
                  className="px-10 w-full inline-flex justify-start items-center gap-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </button>
              </Link>
              <hr className="inline-block opacity-8" />
              <Link href={"/products"}>
                <button
                  className="px-10 inline-flex justify-start items-center gap-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </button>
              </Link>
              <hr className="inline-block opacity-8" />
              <button
                className="px-10 inline-flex justify-start items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </button>
              <hr className="inline-block opacity-8" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
