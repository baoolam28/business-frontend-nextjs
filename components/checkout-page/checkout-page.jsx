'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, MapPin, Heart, MessageCircle, Truck, AlertCircle } from 'lucide-react'

import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"

export default function CheckoutPageComponent() {
  const [paymentMethod, setPaymentMethod] = useState('cash')

  return (
    (<div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ShoppingBag className="h-8 w-8 text-orange-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Thanh Toán</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ShippingAddressSection />
            <ProductSection />
            <SellerNotesAndShipping />
          </div>
          <div className="space-y-8">
            <PaymentOptionsSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>)
  );
}

function ShippingAddressSection() {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold">Địa Chỉ Nhận Hàng</h2>
      </div>
      <div className="mb-4">
        <p className="font-semibold">John Doe</p>
        <p>123 Example Street, City, Country</p>
        <p>Phone: +1234567890</p>
      </div>
      <div className="flex space-x-4">
        <Button variant="outline" size="sm">Mặc Định</Button>
        <Button variant="outline" size="sm">Thay Đổi</Button>
      </div>
    </section>)
  );
}

function ProductSection() {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Sản Phẩm</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Yêu thích
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat ngay
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Image
          src="/placeholder.svg"
          alt="Product"
          width={80}
          height={80}
          className="rounded-md" />
        <div className="flex-grow">
          <h3 className="font-semibold">Product Name</h3>
          <p className="text-sm text-gray-500">Product Description</p>
          <p className="font-semibold mt-2">$99.99</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Qty: 1</p>
          <p className="text-sm text-gray-500">Total: $99.99</p>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <Checkbox id="consumer-protection" />
        <Label htmlFor="consumer-protection" className="ml-2 text-sm">
          Bảo hiểm bảo vệ người tiêu dùng
        </Label>
      </div>
    </section>)
  );
}

function SellerNotesAndShipping() {
  return (
    (<section className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <Label htmlFor="seller-note">Lưu ý cho người bán</Label>
        <Input id="seller-note" placeholder="Nhập lưu ý của bạn ở đây" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Phương thức vận chuyển</h3>
          <p className="text-sm text-gray-500">Giao hàng nhanh</p>
        </div>
        <Button variant="outline" size="sm">Thay đổi</Button>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Truck className="h-4 w-4" />
        <span>Dự kiến giao hàng vào Thứ 6, 17/03</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-orange-500">
        <AlertCircle className="h-4 w-4" />
        <span>Đơn hàng được giao muộn? Nhận ngay voucher 100.000đ</span>
      </div>
    </section>)
  );
}

function PaymentOptionsSection({ paymentMethod, setPaymentMethod }) {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
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
      </RadioGroup>
      {paymentMethod === 'transfer' && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Quét mã QR để thanh toán</h3>
          <Image
            src="/placeholder.svg"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto" />
        </div>
      )}
    </section>)
  );
}

function OrderSummary() {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
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
      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
        Đặt hàng
      </Button>
    </section>)
  );
}