'use client'
import React, {useState, useEffect} from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Search, MessageCircle, Store } from "lucide-react";
import Image from "next/image";
import { useUser } from '../../context/UserContext'
import buyerAPI from '../../api/buyer'
import formatAsVND from '../../utils/formatVND'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../../components/ui/dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../../components/ui/dialog";

export default function OrderPage() {

  const { user } = useUser();
  const [shipments, setShipments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReview, setIsReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  
  useEffect(() =>{  
    if(user && user.id){
      
      const fetchOrder = async () =>{
        try{
          const response = await buyerAPI.orderStatus.getAllOrderStatus( user.id);
          console.log("Full response from API:", response)
          
          if(response.statusCode === 200){
            setShipments(response.data);
            console.log("Data structure:", response.data);
          }else {
            console.error("Error fetching order: ", response.message);
          }
        }catch(error){
          console.log("Error fetching order: ", error);
        }
    }
    fetchOrder()
    }
  }, [ user ])



  const handleStatusClick = (shippingStatus) => {
    setSelectedStatus(shippingStatus);
  };

  const statusMapping = {
    'Tất cả': null,
    'Chờ xác nhận': 'CHO_XAC_NHAN',
    'Đã xác nhận': 'DA_XAC_NHAN',
    'Đang giao': 'DANG_GIAO',
    'Hoàn thành': 'GIAO_HANG_THANH_CONG',
    'Đã hủy': 'DA_HUY_DON',
    'Trả hàng/Hoàn tiền': 'GIAO_HANG_THAT_BAI'
  };

  const filteredShipments = selectedStatus === 'Tất cả' 
    ? shipments 
    : shipments.filter(shipment => shipment.shippingStatus === statusMapping[selectedStatus]);

   // Hàm chuyển đổi trạng thái thành tiếng Việt
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

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const fetchReview = async (productDetailId) => {
    try {
      const reviewResponse = await buyerAPI.review.getReview(productDetailId, user.id);
      if(reviewResponse.statusCode === 200) {
        setReviewData(reviewResponse.data)
      }else{
        setReviewData(null);
      }
    } catch (error) {
     
    }
  }

  const showReview = (detail) => {
    handleOpenDialog();
    fetchReview(detail.productDetailId);
    setSelectedProduct(detail);
  }

  const handleCloseDialog = () => {
    setIsOpen(false); // Đóng dialog
    setReviewData(null);
  };

  const ProductReviewDialog = ({ selectedProduct, handleCloseDialog }) => {

    return (
      <>
        {selectedProduct && (
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent aria-describedby="dialog-description">
              <p id="dialog-description" className="sr-only">Mô tả về đánh giá sản phẩm.</p>
              <DialogHeader>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
              </DialogHeader>
  
              <div className="space-y-4">
                {/* Thông tin sản phẩm */}
                <div className="flex items-start">
                  <Image
                    src={selectedProduct?.image || "/placeholder.svg"}
                    alt="Product"
                    width={60}  // hoặc kích thước bạn muốn
                    height={60}
                    className="w-16 h-16 rounded-lg object-cover mr-4" />
                  <div>
                    <h3 className="font-medium text-sm">{selectedProduct?.productName}</h3>
                    {Object.entries(selectedProduct?.attributes).map(([key, value]) => (
                      <div
                        key={key}
                        className="inline-block mr-2 mb-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs"
                      >
                        <strong className="font-semibold text-gray-800">{key}:</strong>
                        <span className="ml-1 text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Đánh giá */}
                {reviewData ? 
                  (
                    <div className="space-y-2">
                      <Avatar>
                        <AvatarImage src={reviewData.imageUser || "/placeholder.svg"} />
                      </Avatar>
                      <div className="font-medium">{reviewData.username}</div>
                      <div className="flex gap-1">
                        {[...Array(reviewData.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                        ))}
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex gap-2">
                          <span className="text-gray-600">Chất lượng sản phẩm:</span>
                          <span>{reviewData.comment}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {reviewData.reviewDate}
                      </div>
                    </div>
                  ) : (
                    <div>
                      chua co danh gia
                    </div>
                  )
                }
               
              </div>
  
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>
                  Đóng
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
          
        }
      </>
    );
  };


  return (
    <div className="min-h-screen flex justify-center items-start w-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <nav className="bg-white shadow sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-start h-14">
              {['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền'].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleStatusClick(item)}
                    className={`px-4 py-2 rounded ${selectedStatus === item ? 'text-red-400 font-medium underline' : 'text-gray-600 hover:text-red-600'}`}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="bg-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="relative max-w-3xl mx-auto">
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

        {filteredShipments.length > 0 ?(
          filteredShipments.map((shipment, index) => (
          <Card key={index} className="w-full mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex justify-between items-start border-b pb-4 relative">
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg"
                  alt="Store Logo"
                  width={40}
                  height={40}
                  className="rounded-full" />
                <h2 className="text-lg font-semibold">{shipment.storeName}</h2>
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
              <div className="absolute top-8 right-4">
                <span className="font-medium text-red-600">{getStatusInVietnamese(shipment.shippingStatus)}</span>
                {shipment.shippingStatus === 'GIAO_HANG_THANH_CONG'&&(
                  <Link href = {`/shipmentSuccessfully?shipmentId=${shipment.shipmentId}`}>
                  <span className="text-green-600 text-sm mt-2.5 block">Giao hàng thành công</span>
                </Link>
                )}
              </div>
            </CardHeader>
           
            <CardContent className="py-6">
            {shipment.orderOnlineDetails.map((detail, detailIndex) =>(
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
                <div className="text-right">
                  <p className="text-red-600 text-sm">{formatAsVND(detail.price)}</p>
                  <p className="text-black-600">Thành tiền: 
                      <span className="text-red-600 text-lg"> {formatAsVND(detail.totalPrice)}</span> 
                    </p>
                </div>
              </div>
            
            ))}
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4 bg-amber-50">
              
              <div className="flex ml-auto space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => alert('Reordering the product!')}>
                  Mua Lại
                </Button>
                {shipment.shippingStatus === 'DA_HUY_DON' &&(
                  <Link href={`/orderCancellation?shipmentId=${shipment.shipmentId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-gray-100"
                      >
                      Xem Chi Tiết Hủy Đơn
                    </Button>
                  </Link>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => alert('Contacting the seller!')}>  
                  Liên Hệ Người Bán
                </Button>

                <div className="space-y-2">
                  {shipment.orderOnlineDetails.map((detail, index) => (
                    <Button
                      key={index}
                      onClick={() => showReview(detail)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-gray-100">
                        Xem Đánh Giá Shop
                    </Button>
                  ))}
                </div>
                
              </div>
            </CardFooter>
        
          </Card>
        ))
        ) : (
          <p className="text-center text-gray-600">Chưa có đơn hàng</p>
        )}
        
        </main>
      </div>
      {/* Dialog hiển thị đánh giá sản phẩm */}
      <ProductReviewDialog
        selectedProduct={selectedProduct}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}
