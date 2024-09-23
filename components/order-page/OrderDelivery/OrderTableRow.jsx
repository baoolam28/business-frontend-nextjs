/**
 * This code was generated by Builder.io.
 */
import React from "react";

function OrderTableRow() {
  const rowData = [
    "Mã đơn hàng",
    "Tên hàng",
    "Tên người mua",
    "Địa chỉ",
    "Số lượng",
    "Giá",
    "Tổng",
  ];

  return (
    <tr className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-5 py-px mb-0 w-full border border-black border-solid min-h-[101px] max-md:mb-2.5 max-md:max-w-full">
      {rowData.map((data, index) => (
        <td key={index} className="self-stretch my-auto text-black">
          {data}
        </td>
      ))}
      <td className="flex overflow-hidden gap-4 justify-center items-center self-stretch px-px py-5 my-auto text-2xl text-center whitespace-nowrap rounded-xl w-[173px]">
        <button
          className="overflow-hidden self-stretch my-auto text-white bg-red-500 rounded-xl border border-black border-solid h-[40px] min-h-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[40px]"
          aria-label="Reject"
        >
          NO
        </button>
        <button
          className="overflow-hidden self-stretch my-auto text-black bg-green-400 rounded-xl border border-black border-solid h-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[40px]"
          aria-label="Approve"
        >
          YE
        </button>
      </td>
    </tr>
  );
}

export default OrderTableRow;
