"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import buyerAPI from "../../api/buyer";
import Pagination from "../../components/component/pagination";

const BestSelling = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fallbackImage = "https://via.placeholder.com/150";

  // Fetch products using React Query
  const { data: bestSellingProducts, isLoading, error } = useQuery({
    queryKey: ["bestSellingProducts"],
    queryFn: async () => {
      const response = await buyerAPI.product.getAllProducts();
      if (response.statusCode === 200) {
        const filteredProducts = response.data.map((product) => ({
          id: product.productId,
          name: product.productName,
          discount: 0,
          currentPrice: product.price,
          originalPrice: "",
          rating: product.rating || 0,
          reviews: product.totalReviews || 0,
          image: product.images ? product.images[0] : fallbackImage,
        }));
        return filteredProducts;
      } else {
        throw new Error("Failed to fetch products");
      }
    },
    cacheTime: 1000 * 60 * 10, // Cache for 10 minutes
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false, // Prevent refetching when window is focused
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  const totalPages = Math.ceil(bestSellingProducts.length / itemsPerPage);

  const currentProducts = bestSellingProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowMore = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Increase currentPage but not exceed totalPages
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
        {currentProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
      <div className="mt-[50px]">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={bestSellingProducts.length}
          onPageChange={handlePageChange}
        />
      </div>
      {currentPage < totalPages && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 text-base font-medium text-white bg-red-500 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default BestSelling;
