'use client'
import React, {useState, useEffect} from "react";
import { ArrowLeft, Store } from "lucide-react"
import { Button } from "../ui/button"; 
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";   
import Link from 'next/link'
import { useUser } from '../../context/UserContext'
import buyerAPI from '../../api/buyer'
import formatAsVND from '../../utils/formatVND'
import { useRouter, useSearchParams } from 'next/navigation';


export default function OrderCancellation() {

  const { user } = useUser();
  const searchParams = useSearchParams();
  const [shipment, setShipment] = useState(null);
  const shipmentId = searchParams.get('shipmentId');  

  useEffect(() => {
    
    console.log("shipmentId: ", shipmentId); 
    // Kiểm tra xem shipmentId đã có chưa
    if (shipmentId) {
      const fetchShipment = async () => {
        try {
          const response = await buyerAPI.orderStatus.getShipment(shipmentId);
          console.log("Full response from API:", response);

          if (response.statusCode === 200) {
            const shipmentData = response.data;
            setShipment(shipmentData);
            console.log("shipment Data",shipmentData)
          } else {
            console.error("Error fetching shipment: ", response.message);
          }
        } catch (error) {
          console.log("Error fetching shipment: ", error);
        }
      };

      fetchShipment();
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("shipment after update: ", shipment);  // Ghi log khi shipment đã cập nhật
  }, [shipment]);  

  if (!shipment) {
    return <p>Đang tải...</p>;  // Bạn có thể thay thế bằng một component loader
  }

  return (
    
    <div className="container mx-auto min-h-screen flex justify-center items-start w-full">  
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <Link href="/orderstatus">
          <Button variant="ghost" className="mb-6 text-gray-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            TRỞ LẠI
          </Button>
        </Link>
        {shipment && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-sm">
            <p className="font-bold text-red-700">Đã hủy đơn hàng</p>
            <p className="text-gray-600 text-sm mt-1">vào {shipment.canceledDate}</p>
          </div>
        )}
        
        
        <Card className="p-8 bg-white rounded-lg shadow-lg w-full">
          <CardHeader className="flex justify-between items-start border-b pb-4 relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-gray-700 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">{shipment.storeName}</h2>
              </div>
              <Button variant="outline" className="flex items-center hover:bg-gray-100 ml-4">
                Xem Shop
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="py-8">
            <Link href="/prductDetail/productDetailId">
              {shipment.orderOnlineDetails.map((detail, index) => (
                <div key={index} className="flex items-start mb-8">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Product"
                    className="w-32 h-32 object-cover rounded mr-4" />
                  <div>
                    <p className="font-medium text-gray-800 mb-2">{detail.productName}</p>
                    <p className="text-gray-600">Số lượng: {detail.quantity}</p>
                    <p className="font-semibold text-gray-900">{formatAsVND(detail.totalPrice)}</p>
                  </div>
                </div>
              ))}
            </Link>
    
              <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Người mua:</span>
                {console.log(user)}
                <span className="font-medium text-gray-800">{user.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-medium text-gray-800">Chưa thanh toán</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <Link href={`/orderdetails/${shipment.shipmentId}`} className="text-red-600 font-medium hover:underline">
                  #{shipment.shipmentId}
                </Link>
              </div>
            </div>
           
            
          </CardContent>
          
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Lý do hủy:</h3>
              <p className="text-gray-700">Thủ tục thanh toán quá rắc rối</p>
            </div>
          </CardFooter>
          
        </Card>
      </div>
    </div>
  );
}