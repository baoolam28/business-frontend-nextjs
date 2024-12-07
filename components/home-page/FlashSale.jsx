'use client';

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import BuyerAPI from "../../api/buyer";
import { motion, AnimatePresence } from "framer-motion";

const FlashSale = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const fallbackImage = "https://via.placeholder.com/150";
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoSlideInterval = useRef(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await BuyerAPI.product.getAllProducts();
        if (response.statusCode === 200) {
          const filteredProducts = response.data.map((product) => ({
            id: product.productId,
            name: product.productName,
            discount: 0,
            currentPrice: product.price,
            originalPrice: "100",
            rating: 4.5,
            reviews: 65,
            image: fallbackImage,
          }));
          setFlashSaleProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (flashSaleProducts.length > 0) {
      startAutoSlide(); // Start auto-slide on mount
      return () => stopAutoSlide(); // Cleanup on unmount
    }
  }, [flashSaleProducts.length]);

  // Start the auto-slide interval
  const startAutoSlide = () => {
    if (autoSlideInterval.current) return; // Prevent creating multiple intervals
    autoSlideInterval.current = setInterval(() => {
      handleManualNavigation(1); // Move to the next slide
    }, 3000); // 3000ms = 3 seconds
  };

  // Stop the auto-slide interval
  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  // Manual slide navigation
  const handleManualNavigation = (dir) => {
    if (isAnimating) return; // Prevent multiple animations
    setDirection(dir);
    setIsAnimating(true); // Disable navigation while animating

    setCurrentIndex((prevIndex) => {
      if (dir === 1) {
        return prevIndex + itemsPerPage >= flashSaleProducts.length
          ? 0
          : prevIndex + itemsPerPage;
      }
      return prevIndex - itemsPerPage < 0
        ? Math.max(flashSaleProducts.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage;
    });
  };

  const displayedProducts = flashSaleProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5, // Smoother and controlled transition
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3, // Exit faster
      },
    }),
  };

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
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="flex gap-8 items-start mt-10 max-md:max-w-full"
        >
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 items-start mt-5">
        <button
          aria-label="Previous"
          className="focus:outline-none transform transition-transform duration-300 hover:scale-110"
          onClick={() => handleManualNavigation(-1)}
          disabled={isAnimating} // Disable button during animation
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
          disabled={isAnimating} // Disable button during animation
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
