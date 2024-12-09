import React from "react";
import OrderPage from "../../../components/order-page-seller/orderPage";
export const metadata = {
  title: 'Order',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <OrderPage />
    </div>
  );
}
