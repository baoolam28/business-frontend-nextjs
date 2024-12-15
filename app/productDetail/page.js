import React from 'react'
import ProductDetail from '../../components/product-details/ProductPage'
export const metadata = {
  title: 'Product-Detail',
  description: 'This is a description for My Custom Site',
};

export default function page() {
  return (
    <div>
      <ProductDetail/>
    </div>
  )
}
