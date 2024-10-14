import { CreditCard } from "lucide-react"
import { Button } from "../../components/ui/button"
export default function BuyNowButton({ id, quantity }) {

    const onBuyNow = (id, quantity) => {
        console.log("onBuyNow", id)
        console.log("Quantity", quantity)
    };

  return (
    <Button
      onClick={() => onBuyNow(id, quantity)}
      disabled={quantity === 0}
      className="bg-red-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      Mua ngay
    </Button>
  )
}