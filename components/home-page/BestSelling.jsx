/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductCard from "./ProductCard";

const bestSellingProducts = [
  {
    name: "The north coat",
    currentPrice: "$260",
    originalPrice: "$360",
    rating: 4.5,
    reviews: 65,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8df32f72626d6c595bc895d23788b5db8bea86f835004daa71d72ea73b1c564a?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "Gucci duffle bag",
    currentPrice: "$960",
    originalPrice: "$1160",
    rating: 4.5,
    reviews: 65,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7b818e13f340bb8cd1eb0ee2f19630d6ef298450b9f4c21d9917d8191df83149?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "RGB liquid CPU Cooler",
    currentPrice: "$160",
    originalPrice: "$170",
    rating: 4.5,
    reviews: 65,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/77df63255e1f8f35a38fd7eab0768ddb40a29cbc390236342065233025d7a750?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "Small BookSelf",
    currentPrice: "$360",
    originalPrice: "",
    rating: 4.5,
    reviews: 65,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4102cacaf17a5ad27c592496189716e3b8b61aa5e08689528dae6877338ab7d2?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
];

const BestSelling = () => {
  return (
    <section className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end justify-between max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <span className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              This Month
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Best Selling Products
          </h2>
        </div>
        <a
          href="/view-all"
          className="gap-2.5 self-stretch px-12 py-4 h-10 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
        >
          View All
        </a>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base font-medium max-md:mt-10 max-md:max-w-full">
        {bestSellingProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
