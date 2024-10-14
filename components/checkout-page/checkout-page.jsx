'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingBag, MapPin, Heart, MessageCircle, Truck, AlertCircle } from 'lucide-react'
import Header from "../../components/component/Header";
import Footer from "../../components/home-page/Footer";
import buyerAPI from "../../api/buyer";
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"
import { useSearchParams, useRouter } from 'next/navigation'
import FormatVND from "../../utils/formatVND"
import { useUser} from "../../context/UserContext"
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
export default function CheckoutPageComponent() {
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const { user } = useUser() // Now this should work correctly
  const [shippingAddresses, setShippingAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [isNewAddressDialogOpen, setIsNewAddressDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    const rawData = searchParams.get('data')
    if (rawData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(rawData))
        setData(Array.isArray(decodedData) ? decodedData : [])
      } catch (error) {
        console.error('Failed to parse data from URL:', error)
        router.push('/cart')
        setData([]) 
      }
    }else{
      router.push('/cart')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchShippingAddress = async () => {
      if (!user || !user.id) {
        console.error("User is not logged in or user ID is missing");
        return; // Dừng lại nếu user không tồn tại hoặc không có ID
      }
      
      console.log("user Id: " + user.id);
      try {
        const response = await buyerAPI.shippingAddress.getShippingAddressByUserId(user.id);
        console.log(response.statusCode);
        console.log("Response data:", response.data);
        
        if (response.statusCode === 200 && response.data) {
          setShippingAddresses(response.data); // Cập nhật địa chỉ giao hàng
          console.log("Shipping address set:", response.data);
        } else {
          console.error("Failed to fetch shipping address:", response.status);
        }
      } catch (error) {
        console.error("Error fetching shipping address:", error);
      }
    };
  
    fetchShippingAddress();
  }, [user]);


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ShoppingBag className="h-8 w-8 text-orange-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Thanh Toán</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <ShippingAddressSection
              selectedAddress={selectedAddress}
              setIsAddressDialogOpen={setIsAddressDialogOpen}
              setIsNewAddressDialogOpen={setIsNewAddressDialogOpen}
            />
            <ProductSection />
            <SellerNotesAndShipping />
          </div>
          <div className="space-y-8">
            <PaymentOptionsSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            <OrderSummary />
          </div>
        </div>
      </main>
      <AddressSelectionDialog
        isOpen={isAddressDialogOpen}
        setIsOpen={setIsAddressDialogOpen}
        addresses={shippingAddresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <NewAddressDialog
        isOpen={isNewAddressDialogOpen}
        setIsOpen={setIsNewAddressDialogOpen}
        addNewAddress={(newAddress) => {
          setShippingAddresses([...shippingAddresses, newAddress])
          setSelectedAddress(newAddress)
        }}
      />
      <Footer />
    </div>
  )
}

function ShippingAddressSection({ selectedAddress, setIsAddressDialogOpen, setIsNewAddressDialogOpen }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold">Địa Chỉ Nhận Hàng</h2>
      </div>
      {selectedAddress ? (
        <div className="mb-4">
          <p className="font-semibold">{selectedAddress.fullName}</p>
          <p>{selectedAddress.address}</p>
          <p>Phone: {selectedAddress.phoneNumber}</p>
        </div>
      ) : (
        <p className="mb-4">No address selected</p>
      )}
      <div className="flex space-x-4">
        <Button variant="outline" size="sm" onClick={() => setIsAddressDialogOpen(true)}>Thay Đổi</Button>
        <Button variant="outline" size="sm" onClick={() => setIsNewAddressDialogOpen(true)}>Thêm địa chỉ mới</Button>
      </div>
    </section>
  )
}

function AddressSelectionDialog({ isOpen, setIsOpen, addresses, selectedAddress, setSelectedAddress, removeAddress }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn Địa Chỉ Giao Hàng</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer ${
                selectedAddress?.id === address.id ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div>
                <p className="font-semibold">{address.fullName}</p>
                <p>{address.address}</p>
                <p>Phone: {address.phoneNumber}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeAddress(address.id); }} className="text-red-500">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsOpen(false)}>Xác nhận</Button>
      </DialogContent>
    </Dialog>
  );
}

function NewAddressDialog({ isOpen, setIsOpen, addNewAddress }) {
  const [newAddress, setNewAddress] = useState({ name: '', address: '', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewAddress({ ...newAddress, id: Date.now() }) // Use a timestamp as a temporary ID
    setIsOpen(false)
    setNewAddress({ name: '', address: '', phone: '' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm Địa Chỉ Mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Thêm địa chỉ</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ProductSection({data}) {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
      {data.map((item, index) => {
  return (
    <div key={index} className="bg-white border rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Sản Phẩm</h2>
      <div className="flex items-center justify-between mb-4">
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
        <img
          src={item && item.image ? item.image : "https://via.placeholder.com/80"}
          alt="Product"
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{item.productName}</h3>
          <p className="text-sm text-gray-500">
            {Object.entries(item.attributes).map(([key, value]) => (
              <div key={key} className="inline-block mr-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs">
                <strong className="font-semibold text-gray-800">{key}:</strong>
                <span className="ml-1 text-gray-600">{value}</span>
              </div>        
            ))}
          </p>
          <p className="font-semibold mt-2">{FormatVND(item.price)}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">SL: {item.quantity}</p>
          <p className="text-sm text-gray-500">Tổng: {FormatVND(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
})}

    </section>)
  );
}

function SellerNotesAndShipping() {
  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-4">
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
    </section>
  )
}

function PaymentOptionsSection({ paymentMethod, setPaymentMethod }) {
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
    </section>
  )
}

function OrderSummary() {
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
      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
        Đặt hàng
      </Button>
    </section>
  )
}