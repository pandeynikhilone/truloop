import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
const products = [
  {
    id: 1,
    name: "Xiaomi Redmi Note 15",
    price: "20,000",
    image: "./homepage/rectangle.svg",
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

function FeaturedProducts({ product }) {
  return (
    <div>
      <div className="flex flex-col items-center border-3 p-2 rounded-2xl">
        <div className="h-45 lg:w-62.5 lg:h-81.25 flex flex-col justify-center items-center mb-2">
          <div>
            <img
              className="aspect-square w-32.5 lg:w-52.5"
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
      </div>
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

export default function ProductCard() {
  return (
    <div className="my-10 md:px-10 flex flex-col gap-8">
      <div className="flex w-full text-center justify-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Featured Products
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-fit mx-auto gap-1.5 gap-y-4 lg:gap-6">
        {products.map((product) => (
          <FeaturedProducts key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}