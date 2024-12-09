'use client';

import React, {useState, useEffect} from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, Store } from "lucide-react"
import { faArrowLeft, faCheck, faTruck, faBox, faHome, faRedo, faComments } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Button } from "../ui/button"; 
import buyerAPI from '../../api/buyer'
import formatAsVND from '../../utils/formatVND'

export default function OrderDetailsComponent() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [shipment, setShipment] = useState(null);
  const [address, setAddress] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState([]);
  const shipmentId = searchParams.get('shipmentId');
  useEffect(() => {
    

    // Kiểm tra xem shipmentId đã có chưa
    if (shipmentId) {
      const fetchShipment = async () => {
        try {
          const response = await buyerAPI.orderStatus.getShipment(shipmentId);
          console.log("Full response from API:", response);

          if (response.statusCode === 200) {
            const shipmentData = response.data;
            setShipment(shipmentData);

            if(shipmentData.addressId){
              fetchAddress(shipmentData.addressId)
            }

            if (shipmentData.statusHistory && Array.isArray(shipmentData.statusHistory)) {
              const mappedStatus = shipmentData.statusHistory.map((item) => ({
                icon: getIconByStatus(item.shippingStatus),
                text: getStatusInVietnamese(item.shippingStatus),
                time: item.time
              }));
              setShipmentStatus(mappedStatus);
              console.log("Shipment Status1:", shipmentStatus) 
            } else {
              console.error("statusHistory is missing or not an array");
            }
            console.log(shipmentData)
            console.log("Shipment Id:", response.data.shipmentId);
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

  const fetchAddress = async (addressId) => {
    try {
      const response = await buyerAPI.shippingAddress.getAddressById(addressId)

      if(response.statusCode === 200){
        setAddress(response.data)
        console.log("Address: ", response.data)
      }else{
        console.error("Error fetching address: ", response.message);
      }
    } catch (error) {
      console.log("Error fetching address: ", error);
    }
  }

  const orderEvents = [
    { status: 'Đã đặt hàng', time: '10:00 AM, 15/10/2023' },
    { status: 'Đã xác nhận', time: '11:30 AM, 15/10/2023' },
    { status: 'Đang giao hàng', time: '2:30 PM, 16/10/2023' },
    { status: 'Đã giao hàng', time: '9:15 AM, 17/10/2023' },
  ];

  const getStatusInVietnamese = (shippingStatus) => {
    switch (shippingStatus) {
      case 'CHO_XAC_NHAN':
        return 'CHỜ XÁC NHẬN';
      case 'DA_XAC_NHAN':
        return 'ĐÃ XÁC NHẬN';
      case 'DANG_GIAO':
        return 'ĐANG GIAO';
      case 'GIAO_HANG_THANH_CONG':
        return 'HOÀN THÀNH';
      case 'DA_HUY_DON':
        return 'ĐÃ HỦY';
      case 'GIAO_HANG_THAT_BAI':
        return 'GIAO HÀNG THẤT BẠI';
      default:
        return 'KHÔNG XÁC ĐỊNH'; // Phòng trường hợp giá trị không khớp
    }
  };

  const getIconByStatus = (shipmentStatus) => {
    switch (shipmentStatus){
      case 'CHO_XAC_NHAN':
        return faBox;
      case 'DA_XAC_NHAN':
        return faCheck
      case 'DANG_GIAO':
        return faTruck;
      case 'GIAO_HANG_THANH_CONG':
        return faHome;
      default:
        return faBox;
    }
  };
  const handReviewProduct = (productDetailId) => {
      router.push(`/review?productDetailId=${productDetailId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi Tiết Đơn Hàng</h1>
      {/* Navigation */}
      {shipment && (
        <div className="flex justify-between items-center mb-6">
          <Link href="/orderstatus">
            <Button variant="ghost" className="mb-6 text-gray-400 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
                TRỞ LẠI
            </Button>
          </Link>
          <div>
            <span className="font-semibold">Mã đơn hàng: #{shipment.shipmentId}</span>
            <span className="ml-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">{getStatusInVietnamese(shipment.shippingStatus)}</span>
          </div>
        </div>

       
      )}
      
       {/* Order Status */}
       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
          <div className="flex justify-between">
            {shipmentStatus.map((status, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                  <FontAwesomeIcon icon={status.icon} size="lg" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{status.text}</p>
                  <p className="text-sm text-gray-500">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Action Buttons */}
      {shipment && shipment.orderOnlineDetails.map((detail, detailIndex) =>(
        <div key={detailIndex} className="flex gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <FontAwesomeIcon icon={faRedo} className="mr-2" />
          Mua Lại
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center">
          <FontAwesomeIcon icon={faComments} className="mr-2" />
          Liên Hệ Người Bán
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center"
          onClick = {() => handReviewProduct(detail.productDetailId)} >
          <FontAwesomeIcon icon={faComments} className="mr-2" />
          Xác nhận đơn hàng
        </button>
      </div>
      ))}
      
      {/* Shipping Address bị lỗi 404 */} 
      {address && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Địa chỉ nhận hàng</h2>
          <p className="font-semibold">{address.fullName}</p>
          <p>Số điện thoại: {address.phoneNumber}</p>
          <p>{(address.address) + ", " + (address.district) + ", " + (address.province)}</p>
        </div>
      )}
      
      {/* Order Events */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
        <ul>
          {orderEvents.map((event, index) => (
            <li key={index} className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
              <span className="font-semibold mr-2">{event.status}</span>
              <span className="text-sm text-gray-500">{event.time}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Order Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
        { shipment && (
          shipment.orderOnlineDetails.map((detail, detailIndex) => (
            <div key={detailIndex} className="flex space-x-4 items-center mb-4">
              <img 
                src={detail.image? detail.image : "/placeholder.svg"}
                alt="Product"
                width={80}
                height={80}
                className="rounded" />
              <div>
                <h3 className="font-medium text-sm mb-1">{detail.productName}</h3>
                <div className="mt-2 text-sm text-gray-700">
                      {Object.entries(detail.attributes).map(([key, value]) => (
                        <div
                          key={key}
                          className="inline-block mr-2 mb-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs"
                        >
                          <strong className="font-semibold text-gray-800">{key}:</strong>
                          <span className="ml-1 text-gray-600">{value}</span>
                        </div>
                      ))}
                </div>
                <p className="text-sm text-gray-500">x{detail.quantity}</p>
              </div>
            </div>
        )))}

          {shipment &&(
            shipment.orderOnlineDetails.map((detail, detailIndex) => (
              <div key={detailIndex} className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Tổng tiền hàng:</span>
              <span>{formatAsVND(detail.totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Phí vận chuyển:</span>
              <span>{formatAsVND(shipment.shippingFee)}</span>
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>Giảm giá:</span>
              <span>-50,000đ</span>
            </div> */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Thành tiền:</span>
              <span>{formatAsVND((detail.totalPrice) + (shipment.shippingFee))}</span>
            </div>
          </div>
          )))}
           
          
        
      </div>
      
      <div className="flex justify-between items-center shadow-md rounded-lg p-6 bg-amber-50">
        <div className="flex ml-auto space-x-2">Phương thức thanh toán</div>
        {/* <div>{shipment.paymentMethod}</div> */}
      </div>

    </div>
  );
}