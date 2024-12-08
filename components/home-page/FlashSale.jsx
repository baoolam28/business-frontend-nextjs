'use client';

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import BuyerAPI from "../../api/buyer";
import { motion, AnimatePresence } from "framer-motion";

const FlashSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const fallbackImage = "https://via.placeholder.com/150";
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [autoSlideActive, setAutoSlideActive] = useState(true);
  const autoSlideInterval = useRef(null);
  const autoSlideTimeout = useRef(null);

  // Fetch products using React Query
  const { data: flashSaleProducts = [], isLoading, error } = useQuery({
    queryKey: ["flashSaleProducts"],
    queryFn: async () => {
      const response = await BuyerAPI.product.getAllProducts();
      if (response.statusCode === 200) {
        return response.data.map((product) => ({
          id: product.productId || '',
          name: product.productName,
          discount: 0,
          currentPrice: product.price,
          originalPrice: "100",
          rating: product.rating || 0,
          reviews: product.totalReviews || 0,
          image: product.images ? product.images[0] : fallbackImage,
        }));
      } else {
        throw new Error("Failed to fetch products");
      }
    },
    cacheTime: 1000 * 60 * 10, // Cache for 10 minutes
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  useEffect(() => {
    if (flashSaleProducts.length > 0 && autoSlideActive) {
      startAutoSlide(); // Start auto-slide on mount
      return () => stopAutoSlide(); // Cleanup on unmount
    }
  }, [flashSaleProducts.length, autoSlideActive]);

  const startAutoSlide = () => {
    if (autoSlideInterval.current) return; // Prevent creating multiple intervals
    autoSlideInterval.current = setInterval(() => {
      if (autoSlideActive) {
        handleManualNavigation(1); // Move to the next slide
      }
    }, 2000); // 3000ms = 3 seconds
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  const resetAutoSlide = () => {
    setAutoSlideActive(false);
    if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
    autoSlideTimeout.current = setTimeout(() => {
      setAutoSlideActive(true);
    }, 5000); // 10 seconds
  };

  const handleManualNavigation = (dir) => {
    resetAutoSlide(); // Stop auto-slide and reset timeout
    if (!isAnimating) return; // Prevent multiple animations
    setDirection(dir);
    setIsAnimating(true); // Disable navigation while animating

    setCurrentIndex((prevIndex) => {
      const newIndex = dir === 1
        ? (prevIndex + itemsPerPage >= flashSaleProducts.length ? 0 : prevIndex + itemsPerPage)
        : (prevIndex - itemsPerPage < 0 ? Math.max(flashSaleProducts.length - itemsPerPage, 0) : prevIndex - itemsPerPage);

      return newIndex;
    });

    
  };

  const displayedProducts = flashSaleProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, // Slide from left or right
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300, // Slide out to left or right
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;
  if (flashSaleProducts.length === 0) return <p>No products available.</p>;

  return (
    <section className="flex flex-col items-center self-center mt-10 w-full max-w-[1305px] max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end self-start max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-end min-w-[240px] max-md:max-w-full">
          <div className="flex flex-col h-[103px]">
            <div className="flex gap-4 items-center self-start">
              <div className="flex flex-col self-stretch my-auto w-5">
                <div className="flex shrink-0 h-10 bg-red-500 rounded" />
              </div>
              <div className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
                Today's
              </div>
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-widest leading-none text-black">
              Flash Sales
            </h2>
          </div>
        </div>
      </div>

      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={() => setIsAnimating(false)} // Enable navigation after animation
      >
        <div style={{ height: "450px", overflow: "hidden", position: "relative" }}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              marginTop: "2.5rem",
              maxWidth: "100%",
            }}
          >
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatePresence>

      <div className="flex gap-2 items-start mt-5">
        <button
          aria-label="Previous"
          className="focus:outline-none transform transition-transform duration-300 hover:scale-110"
          onClick={() => handleManualNavigation(-1)}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Previous"
            className="object-contain shrink-0 aspect-square w-[46px]"
          />
        </button>
        <button
          aria-label="Next"
          className="focus:outline-none transform transition-transform duration-300 hover:scale-110"
          onClick={() => handleManualNavigation(1)}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Next"
            className="object-contain shrink-0 aspect-square w-[46px]"
          />
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
