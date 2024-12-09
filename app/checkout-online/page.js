import React from 'react'
import CheckoutPage from "../../components/checkout-page/checkout-page"
import { Suspense } from "react";
import Loading from "../../components/component/loading-lottie";
import Animation from "../../utils/lottie-animations/astronot.json";
export default function page() {
  return (
    <div>
      <Suspense fallback={<Loading animation={Animation} />}>
        <CheckoutPage />
      </Suspense>
    </div>
  )
}
