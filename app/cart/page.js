"use client"
import React from 'react'
import CartPageComponents from '../../components/cart-Page/CartPage'
export const metadata = {
  title: 'Cart',
  description: 'This is a description for My Custom Site',
};

export default function CartPage() {

  return (
    <div>
        <CartPageComponents/>
    </div>
  )
}
