import React from 'react'
import { format } from 'date-fns';
import {CircleX} from "lucide-react"
export default function orderDetail({order, onCloseDetail}) {


    const handleClose = () => {
        onCloseDetail();
    }

  return (
    <div>
        <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-gray-500">
                                Nội dung khác
                            </div>
                            <button 
                                onClick={handleClose} 
                                className="flex items-center text-red-500 hover:text-red-700"
                            >
                                <CircleX />
                                Tắt
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Hóa đơn {order.orderId}</h1>
                            <span className="text-sm text-gray-500"><span className="text-sm text-gray-500">
                                {format(new Date(order.orderDate), 'dd/MM/yyyy')}
                                </span></span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{order.status.replaceAll('_', ' ')}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h2 className="text-lg font-bold mb-4">Hóa đơn chi tiết</h2>
                                    <div className="space-y-4">
                                        {order.orderDetails.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                            <img src={item?.imageUrl || "https://placehold.co/60x60"} alt={item.productName} className="w-16 h-16 rounded mr-4" />
                                            <div className="flex-1">
                                                <div className="font-bold">{item.productName? item.productName : ''}</div>
                                                <div className="text-sm text-gray-500">Giá: <a href="#" className="text-blue-500">{item.price}</a></div>
                                                <div className="text-sm text-gray-500">Số lượng: {item.quantity}</div>
                                            </div>
                                            <div className="font-bold">{item.price.toLocaleString('vi-VN')} đ</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t pt-4">
                                    <div className="flex justify-between text-lg  text-red-500 font-bold underline">
                                        <div>Tổng cộng </div>
                                        <div>{(order.orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                                            <div>
                                                <div className="font-bold">Hóa đơn đã tạo</div>
                                                <div className="text-sm text-gray-500"> {format(new Date(order.orderDate), 'dd/MM/yyyy')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Thông tin khách hàng</h2>
                                        
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/40x40" alt="Customer profile" className="w-10 h-10 rounded-full mr-4"/>
                                            <div>
                                                <div className="font-bold">Tên : {order.fullName}</div>
                                                <div className="text-sm text-gray-500">SDT: {order.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Địa chỉ</h2>
                                        
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">{order.address}</div>
                                        <div className="text-sm text-gray-500">Điện thoại: {order.phone}</div>
                                        <a href="#" className="text-blue-500">View map</a>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold"> Thông tin thanh toán</h2>
                                        
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">Trả tiền: {order.paymentStatus ? "Đã trả tiền" : "Chưa trả tiền"}</div>
                                        <div className="text-sm text-gray-500">Phương thức trả : {order.paymentMethod}</div>
                                        <a href="#" className="text-blue-500">{order.phone}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}
