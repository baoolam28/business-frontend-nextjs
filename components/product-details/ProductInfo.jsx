"use client"
import React, { useState, useEffect } from "react"; // Giữ lại dòng này
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import DeliveryInfo from "./DeliveryInfo";
import buyerAPI from '../../api/buyer';
import { useUser } from '../../context/UserContext';

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

  const [cartId, setCartId] = useState(null);
  const { user } = useUser();
  const userId = user ? user.id : null; 
 
  useEffect(() =>{  
    console.log("Current userId:", userId);
    if(userId){
      const fetchCart = async () =>{
        try{
          const response = await buyerAPI.cart.getCartByUserId(userId)
          console.log("Full response from API:", response)
          
          if(response.statusCode === 200){
            //lưu lại cartId
            setCartId(response.data.cartId)

            console.log("Cart Id set: ", response.data.cartId);
          }else {
            console.error("Error fetching cart items: ", response.message);
          }
        }catch(error){
          console.log("Error fetching Cart: ", error)
        }
    }
    fetchCart()
    }else{
      console.log("userId is null, cannot fetch cart.");
    }
  }, [userId])

  const handleAddToCart = async () => {
    if (!cartId) {
      console.error("Cart ID not found, cannot add product to cart.");
      return;
    }

    const productId = productData.id;
    const quantity = 1; // Default quantity to 1, you can get this from state if needed.
    const price = productData.originalPrice

    if(!price || price <= 0){
      console.error("Price is missing or invalid, cannot add product to cart.");
      return;
    }
    if(price > 0){
      console.log("Price not null");
    }

    console.log("Sending data to API: ", { cartId, productId, quantity, price });
    try {
      const response = await buyerAPI.cart.addProductToCart(cartId, productId,  quantity);
      console.log("Add to cart response:", response)
      if (response.statusCode === 200) {
        alert("Product added to cart successfully!");
      } else {
        console.error("Error adding product to cart:. Status:", response.status, "Message:", response.message);
        
        // console.error("Error adding product to cart:", response.message);
        alert("Error adding product to cart. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Lỗi từ phía server
        console.error("Server response error:", error.response.data);
      } else if (error.request) {
        // Lỗi từ phía request (không nhận được phản hồi từ server)
        console.error("No response from server:", error.request);
      } else {
        // Lỗi trong quá trình cấu hình request
        console.error("Error setting up request:", error.message);
      }
    }
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
            aria-label="Add to favorites"
            className="flex items-center justify-center w-[42px] h-[42px] rounded border border-black border-opacity-50"
            onClick={handleAddToCart}
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
