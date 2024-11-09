"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import buyerAPI from "../../api/buyer";

const BestSelling = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [productsPerPage] = useState(8); // Products per page
  const fallbackImage = "https://via.placeholder.com/150";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await buyerAPI.product.getAllProducts();
        if (response.statusCode === 200) {
          const filteredProducts = response.data.map((product) => ({
            id: product.productId,
            name: product.productName,
            discount: 0,
            currentPrice: product.price,
            originalPrice: "",
            rating: 5,
            reviews: 65,
            image: fallbackImage,
          }));

          setBestSellingProducts(filteredProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(bestSellingProducts.length / productsPerPage);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = bestSellingProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end justify-between max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded" />
            </div>
            <span className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              This Month
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Best Selling Products
          </h2>
        </div>
        <a
          href="/view-all"
          className="gap-2.5 self-stretch px-12 py-4 h-10 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
        >
          View All
        </a>
      </div>

      <div className="grid grid-cols-4 gap-8 mt-16 text-base font-medium max-md:mt-10 max-md:max-w-full">
        {currentProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 text-base font-medium text-white bg-red-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="mx-4 text-base font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 text-base font-medium text-white bg-red-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default BestSelling;
