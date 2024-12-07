import { ShoppingCart } from "lucide-react"
import { Button } from "../../components/ui/button"
import BuyerAPI from "../../api/buyer"
import { useUser } from "../../context/UserContext"
import { showSuccessAlert } from "../../utils/reactSweetAlert";
export default function AddToCartButton({ id, quantity }) {

  const {user} = useUser();  
  const onAddToCart = () => {
    
    if(!user){
        console.log("Please login to add product to cart")
      return;
    }

    console.log(user)

    const data = {
        userId: user.id,
        productDetailId: id,
        quantity: quantity,
    }

    console.log("data: " + JSON.stringify(data));

    addToCart(data);
  }

  const addToCart = async (data) => {
    try {
      const res = await BuyerAPI.cart.addToCart(data);
      if(res.statusCode === 200) {
        const cart = res.data.cartItems
        localStorage.setItem('cart', JSON.stringify(cart));
        showSuccessAlert("Thêm vào giỏ hàng","Thêm vào giỏ hàng thành công")
      }
    } catch (error) {
      console.error("Error adding product to cart:", error)
    }
  }

  return (
    <Button
      onClick={() => onAddToCart(id, quantity)}
      disabled={quantity === 0}
      className="bg-green-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Thêm vào giỏ hàng
    </Button>
  )
}