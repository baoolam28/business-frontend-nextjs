"use client";
import React, { useEffect, useState, useMemo } from "react";
import buyerAPI from "../../api/buyer"; // Ensure the API is properly configured
 import Pagination from "../../components/component/pagination";
function CategoryBrowse({ categoryId }) {
  const [categories, setCategories] = useState([]); // State to hold the list of categories
  const fallbackImage = "https://via.placeholder.com/150"; // Default image URL if none from API
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
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

  const filteredCategories = useMemo(() => {
    let result = categories;
    return result;
  },[categories]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const currentCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredCategories, itemsPerPage]);

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
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {currentCategories.length > 0 ? (
          currentCategories.map((category) => (
            <a
              key={category.categoryId}
              href={`/category?id=${category.categoryId}`}
              className="group flex flex-col items-center p-4 rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative w-24 h-24 mb-4">
                <img
                  src={category.icon || fallbackImage}
                  alt={category.categoryName}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="w-full text-center">
              <span className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {category.categoryName}
              </span>
            </div>
            </a>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-40">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
      <div className="mt-[50px]">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={categories.length}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
    
  );
}

export default CategoryBrowse;
