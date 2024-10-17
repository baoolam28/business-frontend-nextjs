'use client'
import React, {useState, useEffect} from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Search, MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import { useUser } from '../../context/UserContext'
import buyerAPI from '../../api/buyer'

export default function OrderPage() {

  const { user } = useUser();
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');

  
  useEffect(() =>{  
    if(user && user.id){
      
      const fetchOrder = async () =>{
        try{
          const response = await buyerAPI.orderStatus.getAllOrderStatus( user.id);
          console.log("Full response from API:", response)
          
          if(response.statusCode === 200){
            setOrderDetails(response.data);
            console.log("Data structure:", response.data);
          }else {
            console.error("Error fetching cart items: ", response.message);
          }
         
        }catch(error){
          console.log("Error fetching Cart: ", error);
        }
    }
    fetchOrder()
    }
  }, [ user])

  

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const statusMapping = {
    'Tất cả': null,
    'Chờ thanh toán': 'CHO_XAC_NHAN',
    'Vận chuyển': 'DANG_VAN_CHUYEN',
    'Đang giao': 'DANG_GIAO_HANG',
    'Hoàn thành': 'GIAO_HANG_THANH_CONG',
    'Đã hủy': 'HUY'
  };

  const filteredOrders = selectedStatus === 'Tất cả' 
    ? orderDetails 
    : orderDetails.filter(order => order.status === statusMapping[selectedStatus]);

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full">
        <nav className="bg-white shadow sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-start space-x-6 h-14">
              {['Tất cả', 'Chờ thanh toán', 'Vận chuyển', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map((item, index) => (
                <li key={index}>
                  <button
                     onClick={() => handleStatusClick(item)}
                    className={`px-4 py-2 rounded ${selectedStatus === item ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-gray-600 hover:bg-gray-100'}`}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="bg-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="relative max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
                className="pl-10 pr-4 py-2 w-full rounded-full" />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20} />
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8 space-y-4">

        {filteredOrders.length > 0 ?(
          filteredOrders.map((order, index) => (
          <Card key={index} className="w-full mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex justify-between items-left border-b pb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg"
                  alt="Store Logo"
                  width={40}
                  height={40}
                  className="rounded-full" />
                <h2 className="text-lg font-semibold">{order.storeName}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center hover:bg-gray-100"
                  onClick={() => alert('Chatting with the store!')}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center hover:bg-gray-100"
                  onClick={() => alert('Viewing the shop!')}>
                  <Store className="mr-2 h-4 w-4" />
                  Xem Shop
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-6">
            {order.orderDetails.map((detail, detailIndex) =>(
              <div key={detailIndex} className="flex justify-between items-start mb-4">
                <div className="flex space-x-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Product"
                    width={80}
                    height={80}
                    className="rounded" />
                  <div>
                    <h3 className="font-medium text-sm mb-1">{detail.productName}</h3>
                    <p className="text-sm text-gray-500">Phân loại: {detail.attributes.color}, {detail.attributes.size}</p>
                    <p className="text-sm text-gray-500">x{detail.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-semibold">{detail.price} ₫</p>
                  <p className="text-black-600 font-semibold">{detail.totalPrice} ₫</p>
                </div>
              </div>
        ))}
              
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div>
                <span className={`font-medium ${order.status === 'HUY' ? 'text-red-600' : 'text-green-600'}`}>{order.status}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => alert('Reordering the product!')}>
                  Mua Lại
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => alert('Viewing cancellation details!')}>
                  Xem Chi Tiết Hủy Đơn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => alert('Contacting the seller!')}>
                  Liên Hệ Người Bán
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
        ) : (
          <p className="text-center text-gray-600">Chưa có đơn hàng</p>
        )}
        
        </main>
      </div>
    </div>
  );
}
