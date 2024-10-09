"use client"
import React , { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import BuyerAPI from "../../api/buyer"

// Giả sử đây là dữ liệu từ API, theo cấu trúc ProductResponse
// const flashSaleProducts = [
//   {
//     productId: 1,
//     barcode: "1234567890123",
//     productName: "HAVIT HV-G92 Gamepad",
//     categoryId: 1,
//     categoryName: "Electronics",
//     abbreviations: "HV-G92",
//     unit: "piece",
//     price: 120.0,
//     supplierId: 1,
//     supplierName: "HAVIT",
//     originId: 1,
//     originName: "China",
//     createdBy: "8a7e8f6d-9f42-4f7b-bf0e-c8b91e781c93",
//     createdDate: new Date(),
//     disabled: false,
//   },
//   {
//     productId: 2,
//     barcode: "9876543210987",
//     productName: "AK-900 Wired Keyboard",
//     categoryId: 1,
//     categoryName: "Electronics",
//     abbreviations: "AK-900",
//     unit: "piece",
//     price: 960.0,
//     supplierId: 2,
//     supplierName: "Logitech",
//     originId: 2,
//     originName: "Japan",
//     createdBy: "8a7e8f6d-9f42-4f7b-bf0e-c8b91e781c94",
//     createdDate: new Date(),
//     disabled: false,
//   },
//   {
//     productId: 3,
//     barcode: "4561237890456",
//     productName: "IPS LCD Gaming Monitor",
//     categoryId: 1,
//     categoryName: "Electronics",
//     abbreviations: "IPS-LCD",
//     unit: "piece",
//     price: 370.0,
//     supplierId: 3,
//     supplierName: "Samsung",
//     originId: 3,
//     originName: "South Korea",
//     createdBy: "8a7e8f6d-9f42-4f7b-bf0e-c8b91e781c95",
//     createdDate: new Date(),
//     disabled: false,
//   },
//   {
//     productId: 4,
//     barcode: "7890123456789",
//     productName: "S-Series Comfort Chair",
//     categoryId: 2,
//     categoryName: "Furniture",
//     abbreviations: "S-Series",
//     unit: "piece",
//     price: 375.0,
//     supplierId: 4,
//     supplierName: "IKEA",
//     originId: 4,
//     originName: "Sweden",
//     createdBy: "8a7e8f6d-9f42-4f7b-bf0e-c8b91e781c96",
//     createdDate: new Date(),
//     disabled: false,
//   },
// ];

const FlashSale = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  // Gọi API khi component được mount
  const fallbackImage =
  "https://via.placeholder.com/150";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await BuyerAPI.product.getAllProducts();
        console.log("API Res ponse:", response);
        if (response.statusCode === 200) {
          const filteredProducts = response.data.map((product) => ({
            id: product.productId,
            name: product.productName,
            discount:0,
            currentPrice: product.price, 
            originalPrice: "100", 
            rating: 4.5,  
            reviews: 65, 
            image: fallbackImage, 
          }));
          setFlashSaleProducts(filteredProducts);
          console.log("filteredProducts: " + filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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
          <div className="flex gap-4 text-black whitespace-nowrap min-w-[240px] w-[302px]">
            <div className="flex flex-col min-h-[50px]">
              <span className="text-xs font-medium">Days</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                03
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col h-[50px]">
              <span className="text-xs font-medium">Hours</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                23
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col min-h-[50px]">
              <span className="text-xs font-medium">Minutes</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                19
              </span>
            </div>
            <div className="flex self-end mt-7 min-h-[16px]" />
            <div className="flex flex-col h-[50px]">
              <span className="text-xs font-medium">Seconds</span>
              <span className="mt-1 text-3xl font-bold tracking-widest leading-none">
                56
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <button aria-label="Previous" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt="Previous"
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
          <button aria-label="Next" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb"
              alt="Next"
              className="object-contain shrink-0 aspect-square w-[46px]"
            />
          </button>
        </div>
      </div>
      <div className="flex gap-8 items-start mt-10 max-md:max-w-full">
      {flashSaleProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
