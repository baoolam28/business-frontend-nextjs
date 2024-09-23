/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductCard from "./ProductCard";

const flashSaleProducts = [
  {
    name: "HAVIT HV-G92 Gamepad",
    currentPrice: "$120",
    originalPrice: "$160",
    discount: "40%",
    rating: 4.5,
    reviews: 88,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a2d788609d8bc670dbbe5cf8dedec944c2b7289967d8892eadc0892071d8e85d?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "AK-900 Wired Keyboard",
    currentPrice: "$960",
    originalPrice: "$1160",
    discount: "35%",
    rating: 4.5,
    reviews: 75,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/749ba95a-fb2f-4b92-96c8-8dfbcce7b6dd?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "IPS LCD Gaming Monitor",
    currentPrice: "$370",
    originalPrice: "$400",
    discount: "30%",
    rating: 4.5,
    reviews: 99,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/362b8c67a11a3871d50868cd48455f8abac5aeafaaf4daca4cc64748293f7e41?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
  {
    name: "S-Series Comfort Chair",
    currentPrice: "$375",
    originalPrice: "$400",
    discount: "25%",
    rating: 4.5,
    reviews: 99,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0ba757b743b392f341e02c60c884779e73d556c27326a073c9bcfe53101f05bf?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
  },
];

const FlashSale = () => {
  return (
    <section className="flex flex-col items-center self-center mt-10 w-full max-w-[1305px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end self-start max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-end min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col h-[103px]">
            <div className="flex gap-4 items-center self-start">
              <div className="flex flex-col self-stretch my-auto w-5">
                <div className="flex shrink-0 h-10 bg-red-500 rounded" />
              </div>
              <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
                Today's
              </div>
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-widest leading-none text-black">
              Flash Sales
            </h2>
          </div>
          <div className="flex gap-4 text-black whitespace-nowrap min-w-[240px] w-[302px]">
            <div className="flex flex-col min-h-[50px]">
              <span className="text-xs font-medium">Days</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                03
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col h-[50px]">
              <span className="text-xs font-medium">Hours</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                23
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col min-h-[50px]">
              <span className="text-xs font-medium">Minutes</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                19
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col h-[50px]">
              <span className="text-xs font-medium">Seconds</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                56
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <button aria-label="Previous" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
          <button aria-label="Next" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt=""
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
        </div>
      </div>
      <div className="flex gap-8 items-start mt-10 max-md:max-w-full">
        {flashSaleProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
