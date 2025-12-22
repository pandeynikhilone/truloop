function Footer() {
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
        <div className="gap-2 flex text-[12px] md:text-[14px] lg:text-lg">
          <span className="hover:cursor-pointer">Home</span>
          <span className="hover:cursor-pointer">Terms</span>
          <span className="hover:cursor-pointer">Socials</span>
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