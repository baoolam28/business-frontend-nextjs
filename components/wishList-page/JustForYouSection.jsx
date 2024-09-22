import React from "react";
import ProductCard from "./ProductCard";

function JustForYouSection() {
  const products = [
    {
      name: "ASUS FHD Gaming Laptop",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/649f60b49c56315a00fd585e8740287a839199908730d2f3378ec432b1967872?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      discount: "-35%",
      currentPrice: "$960",
      originalPrice: "$1160",
      rating: 4.5,
      reviews: 65,
    },
    {
      name: "IPS LCD Gaming Monitor",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d98d1dc21d20860fdd4b13d4013634723d21bf9cf5ac75808b73eb7beba7a856?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$1160",
      rating: 4.5,
      reviews: 65,
    },
    {
      name: "HAVIT HV-G92 Gamepad",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2632be86cb5416f2c49e6bd7f096b55e34248c3dd186ccb81ab9212ab4757699?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$560",
      rating: 4.5,
      reviews: 65,
      isNew: true,
    },
    {
      name: "AK-900 Wired Keyboard",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/48eeabd93e74bbc5e8c5bf44892b150ed93fca974b188800e332b64418bef648?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02",
      currentPrice: "$200",
      rating: 4.5,
      reviews: 65,
    },
  ];

  return (
    <section className="flex flex-col mt-20 max-md:mt-10">
      <div className="flex justify-between items-center mb-4 px-16 max-md:px-4">
        <div className="flex gap-2 items-center">
          <div className="flex h-10 bg-red-500 rounded" />
          <h2 className="text-xl leading-tight text-black">Just For You</h2>
        </div>
        <button className="px-6 py-3 text-base font-medium text-black rounded border border-solid border-black border-opacity-50">
          See All
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-4 max-md:mt-6">
        {products.map((product, index) => (
          <ProductCardWithRating key={index} {...product} />
        ))}
      </div>
    </section>
  );
}

function ProductCardWithRating({
  name,
  image,
  discount,
  currentPrice,
  originalPrice,
  rating,
  reviews,
  isNew,
}) {
  return (
    <div className="flex flex-col min-w-[240px] w-[270px] items-center">
      <ProductCard
        name={name}
        image={image}
        discount={discount}
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        className="min-h-[300px]" // Thêm chiều cao tối thiểu
      />
      <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02"
          alt={`${rating} stars`}
          className="object-contain shrink-0 aspect-[5] w-[100px]"
        />
        <div className="opacity-50">({reviews})</div>
      </div>
      {isNew && (
        <div className="mt-2 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded">
          NEW
        </div>
      )}
    </div>
  );
}

export default JustForYouSection;
