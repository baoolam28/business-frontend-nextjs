import React from "react";

function CartSummary() {
  return (
    <div className="flex flex-wrap gap-10 items-start mt-20 text-base max-md:mt-10 max-md:max-w-full">
      <form className="flex flex-wrap gap-4 items-end min-w-[240px] max-md:max-w-full">
        <input
          type="text"
          placeholder="Coupon Code"
          className="flex overflow-hidden flex-col justify-center items-start px-6 py-4 text-black rounded border border-black border-solid min-w-[240px] w-[300px] max-md:px-5"
          aria-label="Enter coupon code"
        />
        <button
          type="submit"
          className="gap-2.5 self-stretch px-12 py-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
        >
          Apply Coupon
        </button>
      </form>
      <div className="flex overflow-hidden flex-col px-6 py-8 text-black rounded border-2 border-black border-solid min-w-[240px] w-[470px] max-md:px-5 max-md:max-w-full">
        <h2 className="self-start text-xl font-medium leading-snug">Cart Total</h2>
        <div className="flex justify-between mt-6 whitespace-nowrap max-md:max-w-full">
          <div className="my-auto">Subtotal:</div>
          <div className="my-auto">$1750</div>
        </div>
        <div className="shrink-0 mt-4 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="flex justify-between mt-4 whitespace-nowrap max-md:max-w-full">
          <div className="my-auto">Shipping:</div>
          <div className="my-auto">Free</div>
        </div>
        <div className="shrink-0 mt-4 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="flex justify-between mt-4 whitespace-nowrap max-md:max-w-full">
          <div className="my-auto">Total:</div>
          <div className="my-auto">$1750</div>
        </div>
        <button className="gap-2.5 self-center px-12 py-4 mt-4 font-medium bg-red-600 rounded text-neutral-50 max-md:px-5"> {/* Changed to bg-red-600 */}
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
