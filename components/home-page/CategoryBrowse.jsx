"use client";
import React, { useEffect, useState } from "react";
import buyerAPI from "../../api/buyer"; // Ensure the API is properly configured

function CategoryBrowse({ categoryId }) {
  const [categories, setCategories] = useState([]); // State to hold the list of categories
  const fallbackImage = "https://via.placeholder.com/150"; // Default image URL if none from API

  // Function to fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await buyerAPI.category.getAllCategories(); // API endpoint to get all categories
        if (response.statusCode === 200) {
          setCategories(response.data); // Assuming the API returns a list of categories
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Fetch categories on component mount
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
              Today's
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Browse By Category
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8 items-start mt-16 text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        {categories.length > 0 ? (
          categories.map((category) => (
            <a
              key={category.categoryId}
              onClick={() => {
                window.location.href = `/category?id=${category.categoryId}`; // Navigate to Category page with id
              }}
              className="flex flex-col items-center px-9 py-6 rounded border border-solid border-black border-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              style={{
                width: '200px', // Set a fixed width
                height: '250px', // Set a fixed height
              }}
            >
              <img
                loading="lazy"
                src={category.icon || fallbackImage} // Use category icon or default image
                alt={category.categoryName}
                className="object-contain w-full h-full" // Ensure image fits container
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
