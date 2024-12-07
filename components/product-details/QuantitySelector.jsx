import React, { useState, useEffect } from "react";

function QuantitySelector({ initialQuantity = 1, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity); // Giá trị mặc định là 1

  useEffect(() => {
    setQuantity(initialQuantity); // Cập nhật số lượng nếu prop thay đổi
  }, [initialQuantity]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Tăng số lượng
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Giảm số lượng nhưng không cho phép nhỏ hơn 1
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value); // Cập nhật giá trị số lượng nếu người dùng nhập số hợp lệ
    }
  };

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantity);
    }
  }, [quantity, onQuantityChange]);

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Nút giảm số lượng */}
      <button
        aria-label="Decrease quantity"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
        onClick={handleDecrease}
        disabled={quantity <= 1} // Vô hiệu hóa nút nếu số lượng <= 1
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed9ed51dc91da1a317a6ec57e005b4e5f8a1b0bff1721c29819dbbc2af1e9ae3?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="w-4 h-4 transform rotate-180"
          alt="Decrease"
        />
      </button>

      {/* Ô input để hiển thị và chỉnh sửa số lượng */}
      <input
        type="number"
        value={quantity}
        onChange={handleChange} // Cập nhật số lượng khi người dùng nhập vào
        className="py-2 w-16 border-2 border-gray-300 rounded-lg text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        min="1"
      />

      {/* Nút tăng số lượng */}
      <button
        aria-label="Increase quantity"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
        onClick={handleIncrease}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a09c076caa5a0aa0236a51fa2801afde79e8017a579e89aa6abb403c0af33200?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="w-4 h-4"
          alt="Increase"
        />
      </button>
    </div>
  );
}

export default QuantitySelector;
