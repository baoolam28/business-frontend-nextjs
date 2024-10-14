// CartContext.js
import React, { createContext, useState, useEffect } from "react";

// Tạo CartContext
export const CartContext = createContext();

// Tạo provider cho CartContext
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productDetailId === product.productDetailId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productDetailId === product.productDetailId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Cập nhật sản phẩm trong giỏ hàng
  const updateCartItem = (productDetailId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productDetailId === productDetailId ? { ...item, quantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productDetailId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productDetailId !== productDetailId)
    );
  };

  // Xóa tất cả sản phẩm khỏi giỏ hàng và đồng bộ hóa với backend
  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("cart");
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
