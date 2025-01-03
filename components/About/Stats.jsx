/**
 * This code was generated by Builder.io.
 */
import React from "react";
import StatCard from "./StatCard";

function Stats() {
  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f252a42a4bb67a633de12062e819342859459f3141c3cd6f241dc21891b488b?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
      number: "10.5k",
      description: "Sallers active our site",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c00557a9263b27e8e46d0bb89d2c6de242a24b7e3f61c2db0b78ee2c1a0b31c1?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
      number: "33k",
      description: "Mopnthly Produduct Sale",
      isHighlighted: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c63a2c66d4131de320dc8d6c643bd90d133c0973b70f46de11fc832d4a2e6377?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
      number: "45.5k",
      description: "Customer active in our site",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1db64539de64f6fe4479980a7e4be2e67bc0f0ed5529e6c8b4497e5f50152923?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
      number: "25k",
      description: "Anual gross sale in our site",
    },
  ];

  return (
    <div className="flex flex-wrap gap-8 items-start mt-36 text-black max-md:mt-10 max-md:max-w-full">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default Stats;
