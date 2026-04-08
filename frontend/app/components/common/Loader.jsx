import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-[40vh] w-full gap-4">
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-black rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 font-medium animate-pulse">{text}</p>
    </div>
  );
}
