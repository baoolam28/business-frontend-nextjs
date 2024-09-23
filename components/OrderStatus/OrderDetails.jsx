import React from "react";

function OrderDetails() {
  return (
    <div className="flex overflow-hidden flex-wrap gap-5 justify-between items-center pr-8 pl-8 py-4 text-xl bg-stone-50 min-h-[100px] max-md:flex-col max-md:gap-4 max-md:px-5 max-md:max-w-full">
      <p className="my-auto text-black w-full max-md:text-center">
        Đang chờ người bán gửi hàng. Người bán cần gửi trước 29-09-2024, vui lòng
        thanh toán khi nhận hàng.
      </p>
    </div>
  );
}

export default OrderDetails;
