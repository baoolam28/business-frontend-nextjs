import React, { useState } from "react";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1); // Giá trị mặc định là 1

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Tăng số lượng
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1); // Giảm số lượng nhưng không cho phép nhỏ hơn 1
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value); // Cập nhật giá trị số lượng nếu người dùng nhập số hợp lệ
    }
  };

  return (
    <div className="flex items-center gap-0 text-xl leading-snug text-black whitespace-nowrap min-h-[44px]">
      {/* Nút giảm số lượng */}
      <button
        aria-label="Decrease quantity"
        className="w-10 h-11 flex items-center justify-center border border-black border-opacity-50 rounded-l hover:bg-gray-200"
        onClick={handleDecrease}
        disabled={quantity <= 1} // Vô hiệu hóa nút nếu số lượng <= 1
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed9ed51dc91da1a317a6ec57e005b4e5f8a1b0bff1721c29819dbbc2af1e9ae3?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="object-contain w-6 h-6"
          alt="Decrease"
        />
      </button>

      {/* Ô input để hiển thị và chỉnh sửa số lượng */}
      <input
        type="number"
        value={quantity}
        onChange={handleChange} // Cập nhật số lượng khi người dùng nhập vào
        className="py-2 w-16 border-t border-b border-black border-opacity-50 text-center"
        min="1"
      />

      {/* Nút tăng số lượng */}
      <button
        aria-label="Increase quantity"
        className="w-10 h-11 flex items-center justify-center border border-black border-opacity-50 rounded-r hover:bg-gray-200"
        onClick={handleIncrease}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a09c076caa5a0aa0236a51fa2801afde79e8017a579e89aa6abb403c0af33200?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="object-contain w-6 h-6"
          alt="Increase"
        />
      </button>
    </div>
  );
}

export default QuantitySelector;
