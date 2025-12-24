import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

function Card({product}) {
  return (
    <div className="">
      {/* <div className="flex flex-col items-center border-3 p-2 rounded-2xl"> */}
        <div className="h-45 lg:w-58.5 lg:h-75.25 flex flex-col justify-center items-center mb-2 border-3 rounded-2xl px-2">
          <div>
            <img
              className="aspect-square w-32.5 lg:w-50"
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
      {/* </div> */}
      <div className="flex justify-center bg-black rounded-3xl hover:bg-white mt-2 border-2">
        <div className="flex justify-center gap-2 text-white text-sm w-full text-center lg:text-lg p-1 hover:text-black hover:cursor-pointer">
          <div className="flex text-white hover:text-black gap-2">
            <Bars3CenterLeftIcon className="w-5 aspect-square" />
            View Product
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
