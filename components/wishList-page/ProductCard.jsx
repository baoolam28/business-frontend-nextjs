import React from "react";

function ProductCard({ name, image, discount, currentPrice, originalPrice }) {
  return (
    <div className="flex flex-col items-center min-w-[240px] w-[270px]"> {/* Căn giữa toàn bộ thẻ */}
      <div className="flex overflow-hidden flex-col pt-3 w-full rounded bg-neutral-100 max-w-[270px] items-center"> {/* Căn giữa phần nội dung */}
        <div className="flex mx-3 max-md:mx-2.5 justify-center"> {/* Căn giữa phần hình ảnh và giảm giá */}
          <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
            {discount && (
              <div className="gap-2.5 self-start px-3 py-1 bg-red-500 rounded">
                {discount}
              </div>
            )}
            <img
              loading="lazy"
              src={image}
              alt={name}
              className="object-contain self-center max-w-full aspect-[1.38] w-[178px]"
            />
          </div>
          <div className="flex flex-col self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d9345dad452b03692cdbc613f709d144e723e1bbf5357d91182186f1925be37?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02"
              alt=""
              className="object-contain aspect-square w-[34px]"
            />
          </div>
        </div>
        <button className="flex flex-col justify-center items-center px-7 py-2.5 mt-10 w-full text-xs text-white bg-black rounded-none max-md:px-5">
          <div className="flex gap-2 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e462325802d0556992aa0397efea5256f6fd0a6001162dca8b6d920936baee1?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <span className="self-stretch my-auto">Add To Cart</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col self-center mt-4 text-base font-medium"> {/* Căn giữa tên và giá */}
        <div className="text-black text-center">{name}</div>
        <div className="flex gap-3 items-start self-center mt-2 whitespace-nowrap">
          <span className="text-red-500">{currentPrice}</span>
          {originalPrice && (
            <span className="text-black opacity-50">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
