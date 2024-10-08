/**
 * This code was generated by Builder.io.
 */
import React from "react";
const ProductCard = ({
  id,
  name,
  currentPrice,
  originalPrice,
  discount,
  rating,
  reviews,
  image,
}) => {
  const handleImageClick = () => {
    console.log(id) // Điều hướng đến trang chi tiết sản phẩm.
    window.location.href = `/prductDetail?id=${id}`;
  };
  return (
    <article className="flex flex-col w-[270px] p-4 bg-white shadow-lg rounded-lg">
      {/* Image and discount badge */}
      <div className="relative overflow-hidden rounded-lg bg-neutral-100 w-full">
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </span>
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="object-cover w-full h-48 rounded-t-lg"
          onClick={handleImageClick}
        />
      </div>

      {/* Wishlist and Quick View buttons */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          aria-label="Add to wishlist"
          className="focus:outline-none hover:opacity-80 transition-opacity"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Wishlist"
            className="w-8 h-8"
          />
        </button>
        <button
          aria-label="Quick view"
          className="focus:outline-none hover:opacity-80 transition-opacity"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bd4aeaf0f75ee52eaf1a86b7dbd1677fcd7bf0df326c61447e0ca8c7cb5a12e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Quick View"
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* Product details */}
      <div className="flex flex-col mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-red-500 text-xl font-bold">{currentPrice}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2 text-sm">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt={`${rating} out of 5 stars`}
            className="w-20"
          />
          <span className="text-gray-500">({reviews})</span>
        </div>
      </div>
    </article>

  );
};

export default ProductCard;
