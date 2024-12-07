/**
 * This code was generated by Builder.io.
 */
import React, { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductDetails({ productData }) {
  const [variantImage, setVariantImage] = useState(null);

  // Function to handle setting the variant image
  const onVariantImage = (newVariantImage) => {
    // Update only if the newVariantImage is different from the current state
    if (newVariantImage !== variantImage) {
      setVariantImage(newVariantImage);
    }
  };

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
          {productData?.categoryName}
        </a>
        <span className="self-stretch my-auto opacity-50">/</span>
        <span className="self-stretch my-auto">{productData?.productName}</span>
      </nav>
      <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ProductGallery images={productData?.images} variantImage={variantImage? variantImage : null} />
          <ProductInfo productData={productData} onVariantImage={onVariantImage} />
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
