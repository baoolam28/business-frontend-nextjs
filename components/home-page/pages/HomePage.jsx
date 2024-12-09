/**
 * This code was generated by Builder.io.
 */
"use client"
import React from "react";
import Layout from "../../home-page/Layout";
import CategoryList from "../../home-page/CategoryList";
import HeroBanner from "../../home-page/HeroBanner";
import FlashSale from "../../home-page/FlashSale";
import CategoryBrowse from "../../home-page/CategoryBrowse";
import BestSelling from "../../home-page/BestSelling";
import NewArrival from "../../home-page/NewArrival";
import Features from "../../home-page/Features";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const HomePage = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div className="flex flex-col items-center self-center">
          <div className="object-contain  w-full aspect-[2.34] max-w-[1920]  max-md:max-w-full">
            <HeroBanner />
        </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center self-center mt-10 w-full max-w-[1305px] max-md:max-w-full">
          
          </div>
          <FlashSale />
          <div className="shrink-0 mt-16 max-w-full h-px border border-black border-solid w-[1170px] max-md:mt-10" />
          <CategoryBrowse />
          <div className="shrink-0 mt-16 max-w-full h-px border border-black border-solid w-[1170px] max-md:mt-10" />
          <BestSelling />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c8ab3d14f803f9ab24c92ddaf7a38e41dacc06ebff8a5aa2cc2ff40ddc61e47?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Advertisement Banner"
            className="object-contain mt-36 w-full aspect-[2.34] max-w-[1170px] max-md:mt-10 max-md:max-w-full"
          />
          <NewArrival />
          <Features />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4994e2c1a620d4ea356d28611072582355d46de2085b91428063bb54d28d049e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
            alt="Scroll to top"
            className="object-contain self-end mt-16 mr-24 aspect-square w-[46px] max-md:mt-10 max-md:mr-2.5"
          />
      </div>

      </Layout>
    </QueryClientProvider>
  );
};

export default HomePage;
