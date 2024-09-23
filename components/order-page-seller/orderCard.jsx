import React, { useState } from 'react';

export default function OrderCard() {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };


  const items = [
    { name: "Laced shoes on high current", sku: "dfr-t685y-1", quantity: 1, img: "https://placehold.co/60x60" },
    { name: "Another Laced Shoe", sku: "dfr-t685y-2", quantity: 1, img: "https://placehold.co/60x60" },
    { name: "Third Laced Shoe", sku: "dfr-t685y-3", quantity: 1, img: "https://placehold.co/60x60" },
    { name: "Fourth Laced Shoe", sku: "dfr-t685y-4", quantity: 1, img: "https://placehold.co/60x60" },
  ];

  return (
    <div className="p-10 mx-auto bg-white rounded-lg shadow-md mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <h2 className="text-lg font-semibold">Order #2472</h2>
          <span className="ml-2 px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded">Waiting payment</span>
        </div>
        <div className="text-2xl font-bold">$340.48</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          <i className="far fa-calendar-alt mr-1"></i> 14 Sep, 2022 at 8:27 PM | Shipping No: <a href="#" className="text-blue-500">61833014106</a>
        </div>
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-sm text-white bg-green-500 rounded">Delivered</button>
          <button className="px-2 py-1 text-sm text-white bg-green-500 rounded">Auto-SMS</button>
          <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">Add to Blacklist</button>
          <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">Speedy</button>
        </div>
      </div>

      {/* Hiện một item đầu tiên */}
      {items.slice(0, 1).map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={item.img} alt={item.name} className="w-16 h-16 rounded mr-4" />
          <div>
            <h3 className="text-md font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">SKU: <a href="#" className="text-blue-500">{item.sku}</a></p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}

      {/* Hiện thêm item khi nhấn */}
      {showMore && (
        <div>
          {items.slice(1).map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded mr-4" />
              <div>
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">SKU: <a href="#" className="text-blue-500">{item.sku}</a></p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nút toggle để hiện thêm items */}
      <div className="text-blue-500 cursor-pointer" onClick={handleToggle}>
        {showMore ? "Show Less Items" : "More Items"} <i className={`fas fa-chevron-${showMore ? "up" : "down"}`}></i>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded"><i className="fas fa-ellipsis-h"></i></button>
          <button className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded"><i className="fas fa-print"></i> Print</button>
          <button className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded">Update Order <i className="fas fa-chevron-down"></i></button>
        </div>
        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded">View Details</button>
      </div>
    </div>
  );
}
