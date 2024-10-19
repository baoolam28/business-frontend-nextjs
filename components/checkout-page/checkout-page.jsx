'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { ShoppingBag, MapPin, Truck, Trash2 } from 'lucide-react'
import Header from "../../components/component/Header";
import Footer from "../../components/home-page/Footer";
import buyerAPI from "../../api/buyer";
import FormatVND from "../../utils/formatVND"
import { useSearchParams, useRouter } from 'next/navigation'
import { useUser } from "../../context/UserContext"
import AddressSelectionDialog from './AddressSelectionDialog'
import NewAddressDialog from './NewAddressDialog'
import ShippingAddressSection from './ShippingAddressSection'
import ProductSection from './ProductSection'
import SellerNotesAndShipping from './SellerNotesAndShipping'
import PaymentOptionsSection from './PaymentOptionsSection'
import OrderSummary from './OrderSummary'

export default function CheckoutPageComponent() {

  
  const { user } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [shippingAddresses, setShippingAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [isNewAddressDialogOpen, setIsNewAddressDialogOpen] = useState(false)
  const [fee, setFee] = useState(0)
  const [deliveryTime, setDeliveryTime] = useState(null)
  const [shippingMethod, setShippingMethod] = useState(null)
  const [data, setData] = useState([])
  const [orderData, setOrderData] = useState(null)

  // Fetch data from search params
  useEffect(() => {
    const rawData = searchParams.get('data')
    if (rawData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(rawData))
        setData(Array.isArray(decodedData) ? decodedData : [])
        console.log("decodedData: " +JSON.stringify(decodedData))
      } catch (error) {
        console.error('Failed to parse data from URL:', error)
        setData([])
      }
    }
  }, [searchParams])

  // Fetch user shipping addresses
  useEffect(() => {
    if (!user?.id) return
    const fetchShippingAddress = async () => {
      try {
        const response = await buyerAPI.shippingAddress.getShippingAddressByUserId(user.id)
        if (response.statusCode === 200) {
          setShippingAddresses(response.data || [])
          setSelectedAddress(response.data[0])
        } else {
          console.error("Failed to fetch shipping address:", response.status)
        }
      } catch (error) {
        console.error("Error fetching shipping address:", error)
      }
    }
    fetchShippingAddress()
  }, [user])

  const handleDeleteAddress = useCallback(async (addressId) => {
    try {
      const response = await buyerAPI.shippingAddress.deleteShippingAddressById(addressId)
      if (response.statusCode === 204) {
        setShippingAddresses(prevAddresses => prevAddresses.filter(address => address.id !== addressId))
      } else {
        console.error("Failed to delete address:", response.status)
      }
    } catch (error) {
      console.error("Error deleting address:", error)
    }
  }, [])

  useEffect(() => {
    
    const orderOnlineDetailRequests = data?.map((item) => ({
      storeId: item.storeId,
      productDetailId: item.productDetailId,
      quantity: item.quantity,
    })) || [];

    const request = {
      userId: user?.id,
      addressId: selectedAddress?.addressId || null,
      shippingFee: fee,
      shippingMethod: shippingMethod,
      expectedDeliverDate: new Date(deliveryTime * 1000),
      paymentMethod: paymentMethod,
      orderOnlineDetailRequests: orderOnlineDetailRequests
    }

    console.log("request order :"+JSON.stringify(request))
    setOrderData(request)
  },[selectedAddress, paymentMethod, fee, deliveryTime, user, data])

  const handleNewAddress = (address) => {
    setShippingAddresses((prevAddresses) => [...prevAddresses, address]);
  };

  const handleShippingData = (fee, deliveryTime, shippingMethod) =>{
    console.log("fee and delivery time: ",fee, deliveryTime, shippingMethod)
    setFee(fee)
    setDeliveryTime(deliveryTime)
    setShippingMethod(shippingMethod)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ShoppingBag className="h-8 w-8 text-orange-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Thanh Toán</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ShippingAddressSection
            selectedAddress={selectedAddress}
            setIsAddressDialogOpen={setIsAddressDialogOpen}
            setIsNewAddressDialogOpen={setIsNewAddressDialogOpen}
          />
          <ProductSection data={data} />
          <SellerNotesAndShipping orderData={data} selectedAddress={selectedAddress} onShippingData={handleShippingData}/>
        </div>
        <div className="space-y-8">
          <PaymentOptionsSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          <OrderSummary orderData={orderData}/>
        </div>
      </main>
      <AddressSelectionDialog
        isOpen={isAddressDialogOpen}
        setIsOpen={setIsAddressDialogOpen}
        addresses={shippingAddresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        handleDeleteAddress={handleDeleteAddress}
      />
      <NewAddressDialog
        isOpen={isNewAddressDialogOpen}
        setIsOpen={setIsNewAddressDialogOpen}
        onNewAddress={handleNewAddress}
      />
      {/* <Footer /> */}
    </div>
  )
}
