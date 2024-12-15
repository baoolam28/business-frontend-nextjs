/**
 * This code was generated by Builder.io.
 */
"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/component/Header";
import ProductDetails from "./ProductDetails";
import AllReviewProduct from "../../components/review-page/AllReview"
import Footer from "./Footer";
import BuyerAPI from "../../api/buyer";
import { useSearchParams } from 'next/navigation'
import Loading from "../../components/component/loading-lottie"
import Animation from "../../utils/lottie-animations/astronot.json"
import FlashSale from "../../components/home-page/FlashSale";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function ProductPage() {
  const queryClient = new QueryClient();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading ] = useState(true);
  const [productData, setProductData] = useState(null);

  const fallbackImage =
  "https://via.placeholder.com/150";

  

  useEffect(() => {

    if(!id) return;

    console.log("id: " + id);
    fetchProductById(); 

  }, [id]);

  const fetchProductById = async () => {
    setLoading(true);
    try {
      const response = await BuyerAPI.product.getProductDetails(id); 
      console.log("Response Status Code:", response);
      
      if (response.statusCode === 200) {
        setProductData(response.data);
        console.log("Product fetched:", response.data);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }finally{
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading animation={Animation} />; // Hiển thị loading khi chưa có dữ liệu
  }

  return (
    <div className="flex overflow-hidden flex-col bg-gray-50">
      <Header />
      <div className="flex justify-center items-center flex-1">
        <main>
          <ProductDetails productData={productData}/>
          <QueryClientProvider client={queryClient}>
          <FlashSale />
          </QueryClientProvider>
        </main>
      </div>
      <AllReviewProduct productId={id}/>
      <Footer />
    </div>
  );
}

export default function ProductPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage />
    </QueryClientProvider>
  );
}
