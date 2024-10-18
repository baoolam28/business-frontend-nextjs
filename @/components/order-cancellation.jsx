'use client'

import { ArrowLeft, Store } from "lucide-react"
import { Button } from "../../components/ui/button"; 
import { Card } from "../../components/ui/card";   

export default function OrderCancellation() {
  return (
    (<div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          TRỞ LẠI
        </Button>
        
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <p className="font-bold text-red-700">Đã hủy đơn hàng</p>
          <p className="text-gray-600 text-sm">vào 12:06 16-10-2022</p>
        </div>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Store className="h-8 w-8 mr-2" />
              <h2 className="text-lg font-semibold">X-men Official Store</h2>
            </div>
            <Button variant="outline">Xem Shop</Button>
          </div>
          
          <div className="flex mb-6">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="Product"
              className="w-24 h-24 object-cover rounded mr-4" />
            <div>
              <p className="font-medium mb-2">[Mã FMCGMALL -8% đơn 250K] Wax X-men for Boss Clean Cut 70g</p>
              <p className="text-gray-600">Số lượng: 1</p>
              <p className="font-semibold">₫99.000</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Người mua:</span>
              <span>John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span>Chưa thanh toán</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="text-red-600 font-medium">221016H98BXS06</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Lý do hủy:</h3>
            <p className="text-gray-700">Thủ tục thanh toán quá rắc rối</p>
          </div>
        </Card>
      </div>
    </div>)
  );
}