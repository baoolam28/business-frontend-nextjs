/**
 * This code was generated by Builder.io.
 */
import React from "react";

function ProductCard({ name, price, oldPrice, discount, rating, image }) {
  return (
    <div className="flex flex-col min-w-[240px] w-[270px]">
      <div className="flex overflow-hidden gap-1 items-start px-3 pt-3 pb-12 max-w-full rounded bg-neutral-200 w-[270px]">
        <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
          {discount > 0 && (
            <div className="gap-2.5 self-start px-3 py-1 bg-red-500 rounded">
              -{discount}%
            </div>
          )}
          <img
            loading="lazy"
            src={image}
            className="object-contain self-end mt-3 max-w-full aspect-[1.13] w-[172px]"
            alt={name}
          />
        </div>
        <div className="flex flex-col">
          <button aria-label="Add to wishlist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
              className="object-contain aspect-square w-[34px]"
              alt=""
            />
          </button>
          <button aria-label="Quick view">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bd4aeaf0f75ee52eaf1a86b7dbd1677fcd7bf0df326c61447e0ca8c7cb5a12e?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
              className="object-contain mt-2 aspect-square w-[34px]"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start self-start mt-4 text-base font-medium">
        <h3 className="self-stretch text-black">{name}</h3>
        <div className="flex gap-3 items-start mt-2 whitespace-nowrap">
          <span className="text-red-500">${price}</span>
          {oldPrice && (
            <span className="text-black opacity-50">${oldPrice}</span>
          )}
        </div>
        <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
            className="object-contain shrink-0 aspect-[5] w-[100px]"
            alt={`${rating} out of 5 stars`}
          />
          <span className="w-8 opacity-50">({rating})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
