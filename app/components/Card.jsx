import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Card({ product }) {
  const rating = product.rating;
  const imageSrc = product?.images || "/homepage/rectangle.svg";

  return (
    <div>
      <Link href={`/product_info/${product.id}`}>
        <div className="h-45 lg:w-58.5 lg:h-75.25 flex flex-col justify-center items-center mb-2 border-3 rounded-2xl px-2">
          <div>
            <img
              className="aspect-square w-32.5 lg:w-50"
              src={imageSrc}
              alt={product?.name || "Product image"}
            />
          </div>

          <div className="whitespace-nowrap text-sm lg:text-lg">
            <div>{product?.name}</div>

            <div className="flex justify-between">
              <div>₹{product?.price}</div>

              <div className="self-center flex">
                {[...Array(rating)].map((_, index) => (
                  <img
                    key={index}
                    src="/homepage/icon/star_light.svg"
                    alt="star"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Link href={`/product_info/${product.id}`}>
        <button className="cursor-pointer group flex justify-center mt-2 w-full rounded-3xl border-2 bg-black p-1 transition-colors hover:bg-white">
          <span className="flex items-center gap-2 text-sm text-white transition-colors group-hover:text-black lg:text-lg">
            <Bars3CenterLeftIcon className="w-5 aspect-square" />
            View Product
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Card;
