"use client"
import React from "react";
import buyerAPI from '../../api/buyer'
import {useState, useEffect} from 'react'
import {useUser} from '../../context/UserContext'
import formatAsVND from '../../utils/formatVND'


function CartItems() {

  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { user } = useUser();

  const userId = user ? user.id : null; 

  // lấy cartItem theo userId
  useEffect(() =>{  
    console.log("Current userId:", userId);
    if(userId){
      const fetchCart = async () =>{
        try{
          const response = await buyerAPI.cart.getCartByUserId(userId)
          console.log("Full response from API:", response)
          
          if(response.statusCode === 200){
            console.log("Data structure:", response.data);
            const items = response.data && Array.isArray(response.data.cartItems) ? response.data.cartItems : [];
            setCartItems(items) 

            setCartId(response.data.cartId)

            console.log("Cart items set:", items);
          }else {
            console.error("Error fetching cart items: ", response.message);
            setCartItems([]); 
          }
         
        }catch(error){
          console.log("Error fetching Cart: ", error)
          setCartItems([]);
        }
    }
    fetchCart()
    }else{
      console.log("userId is null, cannot fetch cart.");
    }
  }, [userId])

  // delete product from cart
  const handleDeleteItem = async(index) => {
    const updatedCartItems = [...cartItems];
    const productId = updatedCartItems[index].productId;

    if (!cartId) {
      console.error("Cart ID is undefined or invalid for item at index:", index);
      alert("Error: Cart ID is missing for this item. Please refresh the page.");
      return;
    }

    try {
      const response = await buyerAPI.cart.deleteCartItem(cartId, productId)
      console.log("Cart data from API:", response.data);

      if(response.statusCode === 200){
        const newCartItems = updatedCartItems.filter((_, itemIndex) => itemIndex !== index);
        setCartItems(newCartItems)
        console.log("Item deleted successfully");
      }else{
        console.error("Failed to delete item. Status:", response.status, "Message:", response.message);
        alert("Error deleting the item. Please try again.");
      }

    } catch (error) {
      console.error("Error deleting item:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      alert("Error deleting the item. Please try again.");
    }
  }

  //update quantity
  const handleQuantityChange  = async (index, newQuantity) => {
    let quantity = Number(newQuantity)

    if(isNaN(quantity) || quantity === null || newQuantity === ''){
      quantity = 1
    }

    if(quantity === 0){
      const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
      if(confirmDelete){
        handleDeleteItem(index)
        return;
      }else{
       quantity = 1
      }
      return;
    }

    const updatedCartItems = [...cartItems];
    const productId = updatedCartItems[index].productId;
    updatedCartItems[index].quantity = quantity === '' ? '' : quantity  
    const price = updatedCartItems[index].price

    if(!isNaN(price)){
      updatedCartItems[index].totalPrice = (price * quantity).toFixed(2)
    }else{
      console.error("Invalid price format for item:", updatedCartItems[index]);
    }
    setCartItems(updatedCartItems)

    if (!cartId) {
      console.error("Cart ID is undefined or invalid for item at index:", index);
      alert("Error: Cart ID is missing for this item. Please refresh the page.");
      return;
    }

    try {
      const response = await buyerAPI.cart.updateCartItems(cartId, productId, quantity)
      console.log("Cart data from API:", response.data);
      console.log("Updating cart item:", { cartId, productId, quantity, totalPrice: updatedCartItems[index].totalPrice});
      
      if(response.statusCode === 200){
        console.log("Quantity updated successfully");
      }else{
        console.error("Failed to update quantity. Status:", response.status, "Message:", response.message);
        alert("Error updating the cart. Please try again.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      if(error.response){
        console.error("Server Response:", error.response.data);
      }
      alert("Error updating the cart. Please try again.");
    }
  };


  // Ghi log cartItems để xác minh dữ liệu nhận được
  console.log("Received cartItems:", cartItems);

  // Nếu cartItems không phải là mảng hoặc là mảng rỗng, hiển thị thông báo
  if (!cartItems || cartItems.length === 0) {
    return <div>No items in the cart</div>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex overflow-hidden justify-between px-10 py-6 w-full text-base text-black bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="w-1/5 text-left">Product</div>
        <div className="w-1/5 text-center">Price</div>
        <div className="w-1/5 text-center">Quantity</div>
        <div className="w-1/5 text-center">Subtotal</div>
        <div className="w-1/5 text-right"></div>
      </div>
      {cartItems.map((item, index) => (
    <div
      key={index}
      className="flex overflow-hidden justify-between items-center py-6 px-10 mt-10 w-full bg-white rounded shadow-sm max-md:px-5 max-md:flex-col max-md:items-start"
    >
      {/* Product Info */}
      <div className="w-1/5 flex items-center">
        {/* Product Image */}
        {/* <img
          loading="lazy"
          src={item.image}
          className="object-contain w-16 h-16"
          alt={item.productName}
        /> */}
        <div className="ml-4">{item.productName}</div>
      </div>

      {/* Price */}
      <div className="w-1/5 text-center">{formatAsVND(item.price)}</div>

      {/* Quantity */}
      <div className="w-1/5 flex justify-center">
        <button type="button" 
                onClick={() => handleQuantityChange(index, item.quantity - 1)} disabled={item.quantity <= 0} 
                className="border border-gray-300 rounded px-2 py-1 w-8">-</button>
        <input 
          name="quantity"
          value={item.quantity}
          type="text"
          onChange={(e) => handleQuantityChange(index, e.target.value)}
          disabled = {false}
          min="1"
          className="border border-gray-300 rounded px-2 py-1 w-20 text-center"></input>
        <button type="button"
                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                className="border border-gray-300 rounded px-2 py-1 w-8">+</button>
      </div>

      {/* Subtotal */}
      <div className="w-1/5 text-center">{formatAsVND(item.totalPrice)}</div>
      <div className="w-1/5 text-right">
        <button onClick={() => handleDeleteItem(index)} className="text-black hover:text-red-400">Delete</button>
      </div>
    </div>
  ))}
  <div className="flex justify-between items-center mt-6 text-base font-medium text-black max-md:flex-col max-md:items-start">
    <button className="px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:mb-4 max-md:w-full">
      Return To Shop
    </button>
    <button className="px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:w-full">
      Update Cart
    </button>
  </div>
    </div>
  );
}

export default CartItems;
