import React from 'react'
import CheckoutPage from "../../components/checkout-page/checkout-page"
export const metadata = {
  title: 'Checkout-online',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <CheckoutPage/>
    </div>
  )
}
