import React from "react";
import Header from "../../components/component/Header";
import Footer from "./Footer";
import OrderStatusBar from "./OrderStatusBar";
import OrderDetails from "./OrderDetails";
import ActionButtons from "./ActionButtons";

function OrderStatus() {
  return (


      <main className="flex flex-col px-6">

        {/* <nav className="flex gap-3 items-center mt-10 text-sm text-black whitespace-nowrap">
          <span className="opacity-50">Home</span>
          <span>Order Status</span>
        </nav> */}
        
        {/* Search Section */}
        <section className="flex items-center gap-4 my-5 p-3 bg-stone-50 border border-black rounded-lg">
          <form className="flex items-center flex-grow bg-white border border-black rounded-lg">
            <label htmlFor="orderNumber" className="sr-only">
              Order Number
            </label>
            <input
              id="orderNumber"
              type="text"
              className="text-2xl font-medium text-center text-black flex-grow p-2"
              placeholder="mã đơn hàng"
            />
            <button type="submit" className="flex items-center p-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/417383eecfeb74e0dc4112bdae97e36c2141b5fd5ce9ae91607bceb61e8ef97f?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="w-6 h-6"
                alt="Search"
              />
            </button>
          </form>
          <button className="flex items-center px-4 py-2 text-2xl font-medium text-white bg-amber-500 rounded-lg">
            Tìm kiếm
          </button>
        </section>

        {/* Order Status Section */}
        <section className="flex flex-col pt-6 pb-4 bg-white rounded-lg border border-black">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-2 text-xl text-black">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/95eb7fa1ffd1cf124fcb9edc5f520e825b2fd21c602e534232382478a14ae2d3?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="w-8 h-8"
                alt="Back"
              />
              <span>TRỞ LẠI</span>
            </button>
            <div className="flex items-center gap-2 text-2xl text-orange-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a075307f45104566ae69edd024f047e675d80e81c1c4fc063e39a5c25763da5?placeholderIfAbsent=true&apiKey=8529e6e5616147a184f7c00db4d45e0b"
                className="w-8 h-8"
                alt="Status"
              />
              <span>CHỜ LẤY HÀNG</span>
            </div>
          </div>
          <OrderStatusBar />
          <OrderDetails />
          <ActionButtons />
        </section>
      </main>


  );
}

export default OrderStatus;
