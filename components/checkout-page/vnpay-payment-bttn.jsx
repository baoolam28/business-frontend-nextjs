import React from 'react';

const VNPayButton = ({ className = '', ...props }) => {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvTkusYnZ-kcGlbV9j_od91ac-wirwiSHwQ&s"
        alt="VNPay Logo"
        width="100"
        height="32"
        className="h-8 w-auto"
      />
    </button>
  );
};

export default VNPayButton;
