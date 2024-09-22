import React from "react";
import ProductCard from "./ProductCard";

function WishlistSection() {
  const wishlistItems = [
    {
      name: "Gucci duffle bag",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/75aea0f7369e2d837e37fba283e2e008dd477a2aa1bf612f3f91159a7602d3ca?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      discount: "-35%",
      currentPrice: "$960",
      originalPrice: "$1160",
    },
    {
      name: "RGB liquid CPU Cooler",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b790871d793ce853a860b05c2762706ff603674a62ee5a004a93b92d18a6f651?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$1960",
    },
    {
      name: "GP11 Shooter USB Gamepad",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/82e755dd62fe5eb6dec31438da91fb9fe0c1a8ea880eaf2dea3e531b5e364017?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$550",
    },
    {
      name: "Quilted Satin Jacket",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f566813ed66f92077b4659d5ef62f8fac7b64d06c21cc4a8f91ad40f281b216?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$750",
    },
  ];

  return (
    <section className="flex flex-col self-center mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex justify-between items-center mb-4 px-16 max-md:px-4">
        <h2 className="text-xl leading-tight text-black">Wishlist (4)</h2>
        <button className="px-6 py-3 text-base font-medium text-black rounded border border-solid border-black border-opacity-50">
          Move All To Bag
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-4 max-md:mt-6">
        {wishlistItems.map((item, index) => (
          <ProductCard key={index} {...item} className="min-h-[300px]" /> // Thêm chiều cao tối thiểu
        ))}
      </div>
    </section>
  );
}

export default WishlistSection;
