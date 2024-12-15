import React, { useState } from 'react';
import OrderDetail from "../order-page-seller/orderDetail"; // Ensure you import with the correct casing
import matVND from "../../utils/formatVND";
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogFooter, DialogClose } from "../../components/ui/dialog";
export default function OrderCard({ orders, updateOrderStatus }) {
  const [showMore, setShowMore] = useState({});
  const [statusDropdowns, setStatusDropdowns] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null); // Add state for selected order
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleToggle = (orderId) => {
    setShowMore(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleStatusToggle = (orderId) => {
    setStatusDropdowns(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order
  };

  const statuses = [
    'CHO_XAC_NHAN',
    'DANG_GIAO_HANG',
    'GIAO_HANG_THANH_CONG',
    'DANG_DONG_GOI',
    'DON_HUY'
  ];

  const statusTranslations = {
    'CHO_XAC_NHAN': 'Chờ xác nhận',
    'DANG_GIAO_HANG': 'Đang giao hàng',
    'GIAO_HANG_THANH_CONG': 'Giao hàng thành công',
    'DANG_DONG_GOI': 'Đang đóng gói',
    'DON_HUY': 'Đơn hủy'
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'CHO_XAC_NHAN':
        return 'bg-gray-300 text-gray-700';
      case 'DANG_GIAO_HANG':
        return 'bg-purple-100 text-purple-700';
      case 'GIAO_HANG_THANH_CONG':
        return 'bg-green-100 text-green-700';
      case 'DANG_DONG_GOI':
        return 'bg-yellow-100 text-yellow-700';
      case 'DON_HUY':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-purple-100 text-purple-700';
    }
  };

  const renderOrderDetail = (item) => (
    <div key={item.itemId} className="flex items-center mb-4">
      <img src={item?.image || "data:image/jpeg;base64,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"} alt={item.productName} className="w-16 h-16 rounded mr-4" />
      <div>
        <h3 className="text-md font-semibold">{}</h3>
        <p className="text-sm text-gray-500">
          Giá: <a href="#" className="text-blue-500">{matVND(item.price)}</a>
        </p>
        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
      </div>
    </div>
  );

  return (
    <>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="p-10 mx-auto bg-white rounded-lg shadow-md mt-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <h2 className="text-lg  font-semibold">Hóa đơn: {order.orderId}</h2>
                <span className={`ml-2 px-2 py-1 text-sm rounded ${getStatusClass(order.status)}`}>
                  {statusTranslations[order.status]|| order.status}
                </span>
              </div>
              <div className="text-2xl font-bold text-red-500 underline">
              {order.orderDetails.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString('vi-VN')} đ
            </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <i className="far fa-calendar-alt mr-1"></i> {format(new Date(order.orderDate), 'dd/MM/yyyy')}
              </div>
            </div>

            {/* Hiện một item đầu tiên */}
            {renderOrderDetail(order.orderDetails[0])}

            {showMore[order.orderId] && (
              <div>
                {order.orderDetails.slice(1).map(renderOrderDetail)}
              </div>
            )}

            <div className="text-blue-500 cursor-pointer" onClick={() => handleToggle(order.orderId)}>
              {showMore[order.orderId] ? 'Ẩn đi' : 'Xem thêmthêm'}{' '}
              <i className={`fas fa-chevron-${showMore[order.orderId] ? 'up' : 'down'}`}></i>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="relative">
                <button onClick={() => handleStatusToggle(order.orderId)} className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded">
                  Cập nhật đơn hàng <i className="fas fa-chevron-down"></i>
                </button>
                {statusDropdowns[order.orderId] && (
                  <div className="absolute bg-white border rounded mt-1 w-48 shadow-lg z-10">
                    {statuses.map((status, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${getStatusClass(status)}`}
                        onClick={() => updateOrderStatus(order.orderId, status)}
                      >
                        {statusTranslations[status]|| status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button 
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                onClick={
                  ( ) => {
                    handleViewDetails(order);
                    setIsOpenDialog(true);
                  }
                } // Pass the order details to the handler
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Không có đơn hàng nào</p>
      )}
      <Dialog open={isOpenDialog} onOpenChange={(open) => setIsOpenDialog(open)} >
        <DialogContent  className="fullscreen-dialog">
          {selectedOrder && (
            <OrderDetail order={selectedOrder} onCloseDetail={() => setSelectedOrder(null)} />
          )}
        </DialogContent>
      </Dialog>

      
    </>
  );
}
