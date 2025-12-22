"use client";
import Link from "next/link";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import ProductCard from "./components/ProductCard";

function HeroSection() {
  return (
    <>
      <div className="flex justify-center lg:hidden">{<Search />}</div>
      <div className="lg:bg-[url(/homepage/background.png)] my-4">
        <div className="self-stretch h-45 md:h-100 lg:h-[90vh] items-center flex justify-center bg-white opacity-90">
          <div className="p-3 inline-flex flex-col justify-start items-center gap-2.5">
            <div className="self-stretch flex flex-col justify-start items-center gap-2 md:gap-3">
              <div className="w-[92%] md:w-full text-center justify-start leading-6 text-[24px] md:text-3xl lg:text-[50px] font-bold">
                Reviews That Actually Tell You the Truth
              </div>
              <div className="w-[88%] mx-auto text-center justify-start text-[12px] md:text-[15px]  md:px-2 lg:text-[25px] lg:w-[62%]">
                Explore genuine, verified, long-term opinions from users who
                share how their device performed over time - from durability and
                battery life to software stability.
              </div>
            </div>
            <div className="px-2.5 py-1.5 rounded inline-flex justify-center items-center gap-[2.50px]">
              <Link href="/products">
                <button className="bg-black rounded-md text-white text-sm md:text-lg md:p-2.5 font-bold p-2 px-4 hover:cursor-pointer hover:bg-white hover:text-black border-2">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OurRole() {
  return (
    <div className="flex justify-center flex-col gap-4 lg:my-15">
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
        <img
          class="h-53 w-80 block rounded-2xl lg:w-[38.125rem] lg:h-[17.5rem]"
          src="/homepage/img.svg"
        />
      </div>
    </div>
  );
}

function TrustUs() {
  return (
    <div className="flex justify-center flex-col gap-10 lg:my-15 w-full">
      <div className="text-center justify-start text-2xl md:text-3xl lg:text-5xl font-bold">
        Why Trust Us
      </div>

      {/* Fututure Update: Foreach loop have to be implemented! using array*/}

      <div className="md:grid md:grid-cols-2 md:gap-0 place-items-center mx-auto gap-6 flex flex-col-reverse">
        {/* Text */}
        <div className="w-[80%] flex flex-col gap-6">
          <div className="text-[13px] md:text-[15px] lg:text-[20px]">
            Our platform is built for transparency and honesty. Every review is
            verified, updated over time, and shared by people who have genuinely
            purchased and used the product, ensuring reliable and meaningful
            information.
          </div>
          <div className="flex flex-col gap-1.5 text-[13px] md:text-[15px]  md:px-2 lg:text-[20px]">
            <div className="flex gap-2 items-center">
              <img
                className="aspect-square w-5"
                src="/homepage/icon/check_ring.png"
                alt=""
              />
              <span>Long-Term Usage Insights</span>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="aspect-square w-5"
                src="/homepage/icon/check_ring.png"
                alt=""
              />
              <span>Long-Term Usage Insights</span>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="aspect-square w-5"
                src="/homepage/icon/check_ring.png"
                alt=""
              />
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative z-0 flex flex-col gap-4">
        <Navigation />
        <HeroSection />
        <OurRole />
        <ProductCard />
        <TrustUs />
        <Footer />
      </div>
    </main>
  );
}
