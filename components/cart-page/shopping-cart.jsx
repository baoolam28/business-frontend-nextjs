'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useUser } from '../../context/UserContext';
import BuyerAPI from "../../api/buyer";
import { useRouter } from 'next/navigation'
import ChatButton from "../../components/component/chat-button"
export default function ShoppingCartComponent() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user ? user.id : null;
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [selectedItems, setSelectedItems] = useState([]); 

  useEffect(() => {

    if(!userId) return;

    const cartStorage =  getCartInStorage();
    fetchUpdateCart(cartStorage);
    setCart(cartStorage);

  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, userId]);

  const getCartInStorage = () => {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    

    return cart

  }

  const fetchCart = async () => {
    try {
      const response = await BuyerAPI.cart.getCartByUserId(userId);
      console.log("Full response from API:", JSON.stringify(response));

      if (response.statusCode === 200) {
        console.log("Data structure:", response.data);
        const items = response.data && Array.isArray(response.data.cartItems) ? response.data.cartItems : [];
        setCart(items);
      } else {
        console.error("Error fetching cart items: ", response.message);
      }
    } catch (error) {
      console.log("Error fetching Cart: ", error);
    }
  };

  const fetchUpdateCart = async (cart) => {

    const data = {
      userId: userId,  
      cartItems: cart.map((item) => ({
        productDetailId: item.productDetailId, 
        quantity: item.quantity 
      })) || []
    };


    try {
      const response = await BuyerAPI.cart.updateCartByUserId(data);
      console.log("Updated response from API:", JSON.stringify(response));
      if (response.statusCode === 200) {
        console.log("Cart updated successfully!");
      } else {
        console.error("Error updating cart: ", response.message);
      }
    } catch (error) {
      console.log("Error updating Cart: ", error);
    }
  }

  const toggleSelect = (id) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); // Deselect all if all are selected
    } else {
      const allItemIds = cart.map(item => item.productDetailId);
      setSelectedItems(allItemIds); // Select all if some are not selected
    }
  };

  const updateQuantity = (id, newQuantity) => {
    // If the quantity is zero, remove the item from the cart
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.productDetailId !== id));
      setSelectedItems(prev => prev.filter(item => item !== id)); // Remove from selected items
      return;
    }

    // Update the cart with the new quantity
    const updatedCart = cart.map((item) =>
      item.productDetailId === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    // Update selected items if necessary
    if (!selectedItems.includes(id) && newQuantity > 0) {
      setSelectedItems(prev => [...prev, id]); // Add to selected items if not already selected
    }
  };


  const removeItem = (id) => {
    setCart(cart.filter((item) => item.productDetailId !== id));
    setSelectedItems(selectedItems.filter(item => item !== id)); // Remove ID from selectedItems if item is removed
  };

  const totalItems = selectedItems.length;
  const totalPrice = cart.reduce((sum, item) => {
    return selectedItems.includes(item.productDetailId) ? sum + item.price * item.quantity : sum;
  }, 0);

  const handleCheckout = () => {
    const detailedItems = cart.filter(item => selectedItems.includes(item.productDetailId));
    router.push(`/checkout-online?data=${encodeURIComponent(JSON.stringify(detailedItems))}`)
  };

  const defaultImage = 'https://shpetro.com/images/no_image.png';

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="bg-white rounded-lg shadow p-6">
          {cart.map((item) => (
            <div key={item.productDetailId} className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 p-4 bg-white rounded-lg shadow-sm mb-4">
              <Checkbox
                checked={selectedItems.includes(item.productDetailId)}
                onCheckedChange={() => toggleSelect(item.productDetailId)}
                className="mt-1"
              />
              <img 
                src={item.image || defaultImage} 
                alt={item.productName || "Default Image"} 
                loading="lazy" // Lazy load the image
                width={100}
                height={100}
              />
              <div className="flex-grow items-center grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex flex-col text-center">
                  <h2 className="text-lg font-semibold text-gray-900">{item.productName}</h2>
                </div>
                <div className="flex flex-col text-center">
              <div className="mt-2 text-sm text-gray-700">
                {Object.entries(item.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="inline-block mr-2 mb-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs"
                  >
                    <strong className="font-semibold text-gray-800">{key}:</strong>
                    <span className="ml-1 text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center"> {/* Thêm flex và justify-center */}
                <ChatButton
                  buttonText={"Chat ngay"}
                  customClass={
                    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg shadow-purple-500/50"
                  }
                  storeId={item.storeId}
                />
              </div>
              </div>

                <div className="flex flex-col text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg font-semibold text-red-600">
                      {item.price.toLocaleString()}đ
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productDetailId, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productDetailId, parseInt(e.target.value) || 0)}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productDetailId, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="font-semibold text-lg text-gray-900">
                  {(item.price * item.quantity).toLocaleString()}đ
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.productDetailId)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-lg font-semibold mb-4">Promotions</h2>
          <div className="flex flex-col md:flex-row items-center justify-between mb-2">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-orange-500 mr-2" />
              <span>Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ</span>
            </div>
            <button className="text-orange-500 hover:text-orange-700">
              Tìm hiểu thêm
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-orange-500 mr-2" />
              <span>Giảm 10% cho khách hàng mới</span>
            </div>
            <button className="text-orange-500 hover:text-orange-700">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cart.length && cart.length > 0}
              onChange={toggleSelectAll}
              className="mr-4" />
            <span>Chọn tất cả ({totalItems} sản phẩm)</span>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-xl mr-4">
              Tổng cộng: {totalPrice.toLocaleString()}đ
            </p>
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              onClick={handleCheckout}
            >
              Mua Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
