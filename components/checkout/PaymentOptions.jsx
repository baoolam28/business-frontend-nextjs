/**
 * This code was generated by Builder.io.
 */
import React from "react";

const PaymentOptions = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-10 items-center mt-8 max-md:max-w-full">
        <div className="flex gap-4 items-start self-stretch my-auto">
          <div className="flex flex-col w-6">
            <input
              type="radio"
              id="bankPayment"
              name="paymentMethod"
              className="sr-only"
            />
            <label
              htmlFor="bankPayment"
              className="flex shrink-0 h-6 rounded-full border-2 border-black border-solid stroke-[1.5px] stroke-black cursor-pointer"
            ></label>
          </div>
          <label
            htmlFor="bankPayment"
            className="text-base text-black cursor-pointer"
          >
            Bank
          </label>
        </div>
        <div className="flex gap-2 items-start self-stretch my-auto">
          {["visa", "mastercard", "maestro", "discover"].map((card, index) => (
            <img
              key={index}
              loading="lazy"
              src={`http://b.io/ext_${9 + index}-`}
              className="object-contain shrink-0 aspect-[1.5] w-[42px]"
              alt={`${card} card`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4 items-start mt-8">
        <div className="flex flex-col w-6">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            className="sr-only"
          />
          <label
            htmlFor="cashOnDelivery"
            className="flex flex-col justify-center px-0.5 py-1.5 rounded-full border-2 border-black border-solid stroke-[1.5px] stroke-black cursor-pointer"
          >
            <div className="flex shrink-0 w-3.5 h-3.5 bg-black rounded-full fill-black"></div>
          </label>
        </div>
        <label
          htmlFor="cashOnDelivery"
          className="text-base text-black cursor-pointer"
        >
          Cash on delivery
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
