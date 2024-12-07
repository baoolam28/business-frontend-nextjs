"user client"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label  } from "../../components/ui/label"
import VNPayButton from "../../components/checkout-page/vnpay-payment-bttn"
const PaymentOptionsSection = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Phương Thức Thanh Toán</h2>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash">Tiền mặt khi nhận hàng</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="transfer" id="transfer" />
          <Label htmlFor="transfer">Chuyển khoản ngân hàng</Label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <VNPayButton onClick={() => setPaymentMethod('VNPay')}/>
        </div>
      </RadioGroup>
      {paymentMethod === 'transfer' && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Quét mã QR để thanh toán</h3>
          <img
            src="/placeholder.svg"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto" />
        </div>
      )}
    </section>
  )
}

export default PaymentOptionsSection;