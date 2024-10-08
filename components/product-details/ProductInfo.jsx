/**
 * This code was generated by Builder.io.
 */
"use client"
import React , { useEffect, useState }from "react";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import DeliveryInfo from "./DeliveryInfo";
import ProductAPI from "../../api/buyer"

function ProductInfo() {


  const [productData, setProductData] = useState(null);



  const fallbackImage =
  "https://via.placeholder.com/150";
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await ProductAPI.product.getByIdProduct(id);
        console.log(response.statusCode);
        if (response.statusCode === 200) {
          const productData = {
            id: response.data.productId,
            name: response.data.productName,
            discount: 0,  // Lấy discount từ API hoặc gán giá trị mặc định
            currentPrice: "", 
            originalPrice: response.data.price,   // Nếu có giá gốc
            rating: 5,  // Lấy rating từ API hoặc gán mặc định là 5
            reviews: 65,  // Lấy số reviews từ API hoặc gán mặc định
            image: fallbackImage,  // Gán ảnh mặc định nếu không có ảnh từ API
          };
  
          setProductData(productData);  // Gán dữ liệu sản phẩm vào state
          console.log("Product data: ", productData);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    if (productId) {
      fetchProductById();  // Chỉ fetch khi có productId
    }
  }, []);
  
  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start w-full max-md:mt-10">
        <h2 className="text-2xl font-semibold tracking-wider leading-none text-black">
          {productData.name}
        </h2>
        <div className="flex gap-4 items-start mt-4 text-sm">
          <div className="flex gap-2 items-start text-black">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c35d903ef32712f74f1d691c7776b06b738b9c9c861a4482d47d9f9e4b9b6d4a?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
              className="object-contain shrink-0 aspect-[5] w-[100px]"
              alt="Rating stars"
            />
            <span className="opacity-50">{productData.reviews}</span>
          </div>
          <div className="flex gap-4 items-center text-green-500">
            <div className="shrink-0 self-stretch my-auto w-0 h-4 bg-black border border-black border-solid opacity-50" />
            <span className="self-stretch my-auto opacity-60">In Stock</span>
          </div>
        </div>
        <div className="mt-4 text-2xl tracking-wider leading-none text-black">
          {productData.originalPrice} <b>VND</b>
        </div>
        <p className="self-stretch mt-6 mr-7 text-sm leading-5 text-black max-md:mr-2.5">
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </p>
        <div className="shrink-0 self-stretch mt-6 w-full h-px bg-black border border-black border-solid" />
        <ColorSelector />
        <SizeSelector />
        <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
          <QuantitySelector />
          <button className="gap-2.5 self-stretch px-12 py-2.5 text-base bg-red-500 rounded text-neutral-50 max-md:px-5 hover:bg-red-600 hover:shadow-lg transition duration-300">
            Buy Now
          </button>
          <button
            aria-label="Add to favorites"
            className="flex items-center justify-center w-[42px] h-[42px] rounded border border-black border-opacity-50"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96b388edb85323f98c8e7e985856939fb1e202a7b2c62362d9367fbfb2293b30?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
              className="object-contain shrink-0 self-start rounded aspect-square w-[24px]"
              alt=""
            />
          </button>
        </div>
        <DeliveryInfo />
      </div>
    </div>
  );
}

export default ProductInfo;
