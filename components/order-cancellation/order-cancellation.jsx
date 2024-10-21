'use client'
import React, {useState, useEffect} from "react";
import { ArrowLeft, Store } from "lucide-react"
import { Button } from "../ui/button"; 
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";   
import Link from 'next/link'
import buyerAPI from '../../api/buyer'
import formatAsVND from '../../utils/formatVND'
import { useRouter } from 'next/router';


export default function OrderCancellation() {

  return (
    <div className="min-h-screen flex justify-center items-start w-full">  
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
        <Link href="/orderstatus">
          <Button variant="ghost" className="mb-6 text-gray-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            TRỞ LẠI
          </Button>
        </Link>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-sm">
          <p className="font-bold text-red-700">Đã hủy đơn hàng</p>
          <p className="text-gray-600 text-sm mt-1">vào 12:06 16-10-2022</p>
        </div>
        
        <Card className="p-6 bg-white rounded-lg shadow-lg w-full">
          <CardHeader className="flex justify-between items-start border-b pb-2 relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-gray-700 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">X-men Official Store</h2>
              </div>
              <Button variant="outline" className="flex items-center hover:bg-gray-100 ml-4">
                Xem Shop
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="py-6">
            <Link href="/prductDetail/productDetailId">
              <div className="flex items-start mb-8">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Product"
                  className="w-24 h-24 object-cover rounded mr-4" />
                <div>
                  <p className="font-medium text-gray-800 mb-2">[Mã FMCGMALL -8% đơn 250K] Wax X-men for Boss Clean Cut 70g</p>
                  <p className="text-gray-600">Số lượng: 1</p>
                  <p className="font-semibold text-gray-900">₫99.000</p>
                </div>
              </div>
            </Link>
            
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Người mua:</span>
                <span className="font-medium text-gray-800">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-medium text-gray-800">Chưa thanh toán</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <Link href={`/orderdetails/221016H98BXS06`} className="text-red-600 font-medium hover:underline">
                  221016H98BXS06
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