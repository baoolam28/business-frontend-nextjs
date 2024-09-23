import React from "react";

const statusItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/66edc0e5ecba56b4f0212c9e62b441dc18ae6acaa06b35998d5a83a619ced0ba?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
    text: "Đơn Hàng Đã Đặt",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0284ab378ef0a3581a512f49da1f6b0db48e2fb1aa0522f4e51b3dffd44bc041?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
    text: "Chờ lấy hàng",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8fc57e2b626558c903e8088ad631dab41883401464e6cf4def0bfe5ee8fc6b2?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
    text: "Chờ lấy hàng",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d1902a84fb7c8b46df6ff3f7615a1095728c82ad49109edd038d1ed1bc1a900?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
    text: "Đang giao",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/89b519b97d877a280e54099cd0c3ca041a5ce7d95310488fa07f385dad462dc8?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b",
    text: "Đánh giá",
  },
];

function OrderStatusBar() {
  return (
    <div className="flex overflow-hidden flex-wrap gap-6 justify-between items-center px-6 py-4 mt-2 text-lg text-black border border-black border-solid rounded-xl max-md:px-4 max-md:flex-col max-md:items-stretch">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-center text-center min-h-[100px] min-w-[100px] w-[150px]"
        >
          <img
            loading="lazy"
            src={item.icon}
            className="object-contain w-[50px] h-[50px]"
            alt={`Status ${index + 1}`}
          />
          <div className="mt-2">{item.text}</div>
        </div>
      ))}
    </div>
  );
}

export default OrderStatusBar;
