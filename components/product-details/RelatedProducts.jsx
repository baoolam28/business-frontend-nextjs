/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductCard from "./ProductCard";

function RelatedProducts() {
  const products = [
    {
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      oldPrice: 160,
      discount: 40,
      rating: 88,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a2d788609d8bc670dbbe5cf8dedec944c2b7289967d8892eadc0892071d8e85d?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e",
    },
    {
      name: "AK-900 Wired Keyboard",
      price: 960,
      oldPrice: 1160,
      discount: 35,
      rating: 75,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c43d6f6d-4a8c-4e0b-b947-7beb13c56db5?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e",
    },
    {
      name: "IPS LCD Gaming Monitor",
      price: 370,
      oldPrice: 400,
      discount: 30,
      rating: 99,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/362b8c67a11a3871d50868cd48455f8abac5aeafaaf4daca4cc64748293f7e41?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e",
    },
    {
      name: "RGB liquid CPU Cooler",
      price: 160,
      oldPrice: 170,
      discount: 0,
      rating: 65,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c98161e91a2ada6469ea26534f75829b08f7abf5dfb9fb1c382b63d595a396eb?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e",
    },
  ];

  return (
    <section className="flex flex-col mt-36 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-4 items-center self-start">
        <div className="flex flex-col self-stretch my-auto w-5">
          <div className="flex shrink-0 h-10 bg-red-500 rounded" />
        </div>
        <h2 className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
          Related Item
        </h2>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;