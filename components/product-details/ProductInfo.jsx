"use client"
import React, { useState, useEffect } from "react";
import AttributeSelector from "./AttributeSelector";
import QuantitySelector from "./QuantitySelector";
import DeliveryInfo from "./DeliveryInfo";

function ProductInfo({ productData }) {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filteredVariant, setFilteredVariant] = useState(null);
  const [availableOptions, setAvailableOptions] = useState({});

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

    // Tự động bỏ chọn các thuộc tính không còn khả dụng
    const newSelectedAttributes = { ...selectedAttributes };
    Object.keys(newSelectedAttributes).forEach((key) => {
      if (!newAvailableOptions[key] || !newAvailableOptions[key].has(newSelectedAttributes[key])) {
        delete newSelectedAttributes[key];
      }
    });
    setSelectedAttributes(newSelectedAttributes);

  }, [selectedAttributes, productData.variants]);

  // Xử lý khi người dùng thay đổi thuộc tính
  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: value,
    }));
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

        <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
          <QuantitySelector />
          <button
            className="gap-2.5 self-stretch px-12 py-2.5 text-base bg-red-500 rounded text-neutral-50 max-md:px-5 hover:bg-red-600 hover:shadow-lg transition duration-300"
            disabled={!filteredVariant}
          >
            Buy Now
          </button>
        </div>
        <DeliveryInfo />
      </div>
    </div>
  );
}

export default ProductInfo;
