"use client"
import {useState, useEffect} from "react"
import buyerAPI from "../../api/buyer"


export default function page() {

  const [carts, setCarts] = useState([]);

  useEffect(() =>{

    const fetchCartData = async () => {
      try {
        const response = await buyerAPI.cart.getAllCarts();
        if(response.statusCode === 200) {
          setCarts(response.data);
        }
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchCartData();

  },[]);


  return <div>
    <h1>Carts Page</h1>
    {carts.map((cart) => (
      <div key={cart.cartId}>
        <h2>Cart ID: {cart.cartId}</h2>
        <p>Total Items: {cart.totalItems}</p>
        <p>Total Price: {cart.totalPrice}</p>
      </div>
    ))}
  </div>;
}
