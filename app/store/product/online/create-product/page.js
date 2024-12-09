import React from 'react'
import ProductAddition from "../../../../../components/component/product-addition"
import TestProduct from "./testProduct"
export const metadata = {
  title: 'Create Product',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <ProductAddition/>
      {/* <TestProduct />  */}
    </div>
  )
}
