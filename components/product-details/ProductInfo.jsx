"use client"
import React, { useState, useEffect } from "react";
import AttributeSelector from "./AttributeSelector";
import QuantitySelector from "./QuantitySelector";
import DeliveryInfo from "./DeliveryInfo";
import BuyNow from "../../components/component/buy-now-button"
import AddToCart from "../../components/component/add-to-cart-button"
function ProductInfo({ productData, onVariantImage }) {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filteredVariant, setFilteredVariant] = useState(null);
  const [availableOptions, setAvailableOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  }; 

  useEffect(() => {
    if (Object.keys(selectedAttributes).length > 0) {
      const matchingVariant = productData.variants.find((variant) =>
        Object.keys(selectedAttributes).every(
          (key) => variant.attributes[key] === selectedAttributes[key]
        )
      );
      setFilteredVariant(matchingVariant);
      onVariantImage(matchingVariant ? matchingVariant.image : null);
    } else {
      setFilteredVariant(null);
      onVariantImage(null);
    }
  },[selectedAttributes])


  // Lấy danh sách các thuộc tính từ các biến thể
  const attributeOptions = {};
  productData.variants.forEach((variant) => {
    Object.keys(variant.attributes).forEach((attrKey) => {
      if (!attributeOptions[attrKey]) {
        attributeOptions[attrKey] = new Set();
      }
      attributeOptions[attrKey].add(variant.attributes[attrKey]);
    });
  });

  const attributes = Object.keys(attributeOptions).reduce((acc, key) => {
    acc[key] = Array.from(attributeOptions[key]);
    return acc;
  }, {});

  // Cập nhật biến thể phù hợp và các tùy chọn khả dụng
  useEffect(() => {
    const matchingVariant = productData.variants.find((variant) =>
      Object.keys(selectedAttributes).every(
        (key) => variant.attributes[key] === selectedAttributes[key]
      )
    );
    setFilteredVariant(matchingVariant);
    
    const newAvailableOptions = {};
    productData.variants.forEach((variant) => {
      Object.keys(variant.attributes).forEach((attrKey) => {
        if (!newAvailableOptions[attrKey]) {
          newAvailableOptions[attrKey] = new Set();
        }
        const isMatching = Object.keys(selectedAttributes).every(
          (key) =>
            key === attrKey ||
            !selectedAttributes[key] ||
            variant.attributes[key] === selectedAttributes[key]
        );
        if (isMatching) {
          newAvailableOptions[attrKey].add(variant.attributes[attrKey]);
        }
      });
    });

    setAvailableOptions(
      Object.keys(newAvailableOptions).reduce((acc, key) => {
        acc[key] = Array.from(newAvailableOptions[key]);
        return acc;
      }, {})
    );
    
  }, [selectedAttributes, productData.variants]);

  // Xử lý khi người dùng thay đổi thuộc tính
  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  // Reset khi cần thay đổi lại các thuộc tính đã chọn
  const resetSelection = () => {
    setSelectedAttributes({});
    setFilteredVariant(null);
  };

  const handleBuyNow = () => {
    console.log("filteredVariant: ", filteredVariant);
    console.log("selectedAttributes: ", selectedAttributes);
  };

  return (
    <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start w-full max-md:mt-10">
        <h2 className="text-2xl font-semibold tracking-wider leading-none text-black">
          {productData.name}
        </h2>
        <div className="mt-4 text-2xl tracking-wider leading-none text-black">
          {filteredVariant ? filteredVariant.price : productData.originalPrice} <b>VND</b>
        </div>
        <p className="self-stretch mt-6 mr-7 text-sm leading-5 text-black max-md:mr-2.5">
          {productData.description}
        </p>
        <div className="shrink-0 self-stretch mt-6 w-full h-px bg-black border border-black border-solid" />

        {/* Hiển thị các lựa chọn thuộc tính */}
        {Object.keys(attributes).map((attrKey) => (
          <AttributeSelector
            key={attrKey}
            attribute={attrKey}
            options={attributes[attrKey]}
            selectedValue={selectedAttributes[attrKey]}
            availableOptions={availableOptions[attrKey] || []}
            onChange={(value) => handleAttributeChange(attrKey, value)}
          />
        ))}

        <button
          onClick={resetSelection}
          className="mt-4 text-sm text-blue-500 hover:underline"
        >
          Reset Selection
        </button>

        <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
          <QuantitySelector initialQuantity={quantity} onQuantityChange={handleQuantityChange} />
        </div>
        <div className="flex gap-4 self-stretch mt-6 w-full font-medium mt-4">
          <BuyNow id={filteredVariant?.productDetailId} quantity={quantity}/>
          <AddToCart id={filteredVariant?.productDetailId} quantity={quantity}/>
        </div>
        {/* <DeliveryInfo /> */}
      </div>
    </div>
  );
}

export default ProductInfo;
