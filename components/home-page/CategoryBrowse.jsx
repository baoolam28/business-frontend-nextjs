"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios hoặc import BuyerAPI nếu bạn đã cấu hình sẵn
import buyerAPI from "../../api/buyer";
function CategoryBrowse({ categoryId }) {
  const [categoryData, setCategoryData] = useState(null); // State để lưu dữ liệu danh mục
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
  const fallbackImage = "https://via.placeholder.com/150"; // Đường dẫn ảnh mặc định nếu không có từ API

  // Hàm gọi API để lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await buyerAPI.category.getAllCategories()// Đường dẫn API của bạn để lấy tất cả danh mục
        if (response.statusCode === 200) {
          setCategories(response.data); // Giả sử API trả về danh sách danh mục
          console.log("Categories: ", response.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Fetch danh mục ngay khi component mount
  }, []);


  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <span className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              Categories
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Browse By Category
          </h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        {categories.length > 0 ? (
          categories.map((category) => (
            <a
              key={category.categoryId}
              onClick={() => {
                window.location.href = `/category?id=${category.categoryId}`; // Duy chuyển đến trang Category kèm theo id
              }} // Thay bằng handleCategoryClick nếu bạn có hàm đó
              className="flex overflow-hidden flex-col items-center px-9 py-6 rounded border border-solid border-black border-opacity-30 w-[170px] max-md:px-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <img
                loading="lazy"
                src={category.icon || fallbackImage} // Lấy hình ảnh từ danh mục hoặc dùng hình mặc định
                alt={category.categoryName}
                className="object-contain w-14 aspect-square"
              />
              <span className="mt-4">{category.categoryName}</span>
            </a>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </section>
  );
}

export default CategoryBrowse;
