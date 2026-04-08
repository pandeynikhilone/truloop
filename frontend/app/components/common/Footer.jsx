"use client";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <div className="w-[320px] mx-auto md:w-full lg:w-full py-4 md:px-20">
      <div className="flex items-center justify-between">
        <div>
          <img
            src="/homepage/truloop_icon.svg"
            className="w-9 aspect-square md:w-14 md:h-14 self-center"
            alt="truloop"
          />
        </div>
        <div className="flex text-[12px] md:text-[14px] lg:text-[16px]">
          <button 
            onClick={scrollToTop} 
            className="hover:cursor-pointer font-medium hover:text-gray-600 transition-colors flex items-center gap-1.5"
          >
            <span>Scroll to top</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
        </div>
        <div className="flex gap-1 md:gap-3">
          <img
            className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]"
            src="/homepage/icon/insta.svg"
            alt=""
          />
          <img
            className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]"
            src="/homepage/icon/insta.svg"
            alt=""
          />
          <img
            className="w-4 md:w-[2.02681rem] md:h-[2.02681rem]"
            src="/homepage/icon/insta.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default Footer;