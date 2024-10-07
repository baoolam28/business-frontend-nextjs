/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductDetails() {
  return (
    <section className="flex flex-col self-center mt-20 w-full max-w-[1171px] max-md:mt-10 max-md:max-w-full">
      <nav
        className="flex gap-3 items-center self-start text-sm text-black"
        aria-label="Breadcrumb"
      >
        <a href="#" className="self-stretch my-auto opacity-50">
          Account
        </a>
        <span className="self-stretch my-auto opacity-50">/</span>
        <a href="#" className="self-stretch my-auto opacity-50">
          Gaming
        </a>
        <span className="self-stretch my-auto opacity-50">/</span>
        <span className="self-stretch my-auto">Havic HV G-92 Gamepad</span>
      </nav>
      <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ProductGallery />
          <ProductInfo />
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;