import React from "react";

function ActionButtons() {
  return (
    <div className="flex overflow-hidden flex-col justify-center self-stretch py-8 my-auto text-center rounded-xl min-h-[300px] min-w-[240px] w-[400px] max-md:max-w-full shadow-lg">
      <button className="overflow-hidden px-6 py-4 w-full text-white bg-amber-500 rounded-xl border border-black border-solid transition-colors duration-300 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 max-md:px-4 max-md:max-w-full">
        Liên hệ người bán
      </button>
      <button className="overflow-hidden px-6 py-4 mt-6 w-full text-black rounded-xl border border-black border-solid bg-zinc-50 transition-colors duration-300 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-opacity-50 max-md:px-4 max-md:mt-5 max-md:max-w-full">
        Hủy đơn hàng
      </button>
    </div>
  );
}

export default ActionButtons;
