import React, { useState } from "react";

function SizeSelector() {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M"); // Giá trị mặc định là "M"

  return (
    <div className="flex gap-6 items-center mt-6 whitespace-nowrap">
      <span className="self-stretch my-auto text-xl tracking-wide leading-none text-black">
        Size:
      </span>
      <div className="flex gap-4 items-start self-stretch my-auto text-sm font-medium text-black">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)} // Cập nhật kích thước được chọn
            className={`overflow-hidden px-2 pt-1.5 pb-4 w-8 rounded border border-solid ${
              size === selectedSize // Kiểm tra xem kích thước có được chọn hay không
                ? "bg-red-500 text-neutral-50"
                : "border-black border-opacity-50"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelector;
