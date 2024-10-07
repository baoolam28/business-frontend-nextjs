/**
 * This code was generated by Builder.io.
 */
import React from "react";

function DeliveryInfo() {
  return (
    <div className="flex overflow-hidden flex-col items-start self-stretch py-6 mt-10 w-full font-medium rounded border border-solid border-black border-opacity-50">
      <div className="flex gap-4 items-center ml-4 max-md:ml-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a23f35277ec287bdea2870638bbdacf171666c11a657aa3e10b9901a2334e8b?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
          alt=""
        />
        <div className="flex flex-col self-stretch my-auto min-w-[240px]">
          <div className="text-base text-black">Free Delivery</div>
          <div className="mt-2 text-xs text-black">
            Enter your postal code for Delivery Availability
          </div>
        </div>
      </div>
      <div className="shrink-0 self-stretch mt-4 h-px bg-black border border-black border-solid" />
      <div className="flex gap-4 items-center mt-4 ml-4 text-black max-md:ml-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8eb9d4232c5c4b5fb4e8c5b395d852ff88717160dc1ebc4089000daaa178e67?placeholderIfAbsent=true&apiKey=f647c9309a8f4fd282df2349ecee336e"
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
          alt=""
        />
        <div className="flex flex-col self-stretch my-auto">
          <div className="text-base">Return Delivery</div>
          <div className="mt-2 text-xs leading-5">
            Free 30 Days Delivery Returns.{" "}
            <a href="#" className="underline">
              Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfo;