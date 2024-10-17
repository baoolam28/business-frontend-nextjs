
"user client"
import { Button } from "../../components/ui/button"
import BuyerAPI from "../../api/buyer"
import {showSuccessAlert, showErrorAlert} from "../../utils/reactSweetAlert"
import { useRouter } from  "next/navigation"

export default function OrderSummary({orderData}) {

const router = useRouter();

  const handleOrderOnline = async () => {

    if(!orderData || orderData.addressId == null){
      showErrorAlert("Đặt hàng thất bại","Vui lòng chọn địa chỉ giao hàng")
      return;
    }

    try {
      const response = await BuyerAPI.order.createOrderOnline(orderData);
      if(response.statusCode === 200){
        showSuccessAlert("Đặt hàng thành công","đơn hàng đã được đặt quý khác có thể tiếp tục mua hàng")
        router.push("/home-page")
      }
    } catch (error) {
        showErrorAlert("Đặt hàng thất bại","Vui lòng điền đầy đủ thông tin trước khi đặt hàng")
    }
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Tổng Đơn Hàng</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Tổng tiền hàng</span>
          <span>$99.99</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Tổng thanh toán</span>
          <span>$104.99</span>
        </div>
      </div>
      <Button 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
        onClick={handleOrderOnline}
      >
        Đặt hàng
      </Button>
    </section>
  )
}