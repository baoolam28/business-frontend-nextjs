import React, { useState } from 'react';
import OrderDetail from "./OrderDetail"; // Ensure you import with the correct casing
import matVND from "../../utils/formatVND";

export default function OrderCard({ orders, updateOrderStatus }) {
  const [showMore, setShowMore] = useState({});
  const [statusDropdowns, setStatusDropdowns] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null); // Add state for selected order

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
      <img src={item.image} alt={item.productName} className="w-16 h-16 rounded mr-4" />
      <div>
        <h3 className="text-md font-semibold">{item.productName}</h3>
        <p className="text-sm text-gray-500">
          Price: <a href="#" className="text-blue-500">{matVND(item.price)}</a>
        </p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
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
                <h2 className="text-lg font-semibold">Order {order.orderId}</h2>
                <span className={`ml-2 px-2 py-1 text-sm rounded ${getStatusClass(order.status)}`}>
                  {order.status.replaceAll('_', ' ')}
                </span>
              </div>
              <div className="text-2xl font-bold">
                {order.orderDetails.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString('vi-VN')} đ
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <i className="far fa-calendar-alt mr-1"></i> {order.orderDate}
              </div>
              <div className="flex space-x-2">
                <button className="px-2 py-1 text-sm text-white bg-green-500 rounded">Delivered</button>
                <button className="px-2 py-1 text-sm text-white bg-green-500 rounded">Auto-SMS</button>
                <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">Add to Blacklist</button>
                <button className="px-2 py-1 text-sm text-white bg-red-500 rounded">Speedy</button>
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
              {showMore[order.orderId] ? 'Show Less Items' : 'More Items'}{' '}
              <i className={`fas fa-chevron-${showMore[order.orderId] ? 'up' : 'down'}`}></i>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="relative">
                <button onClick={() => handleStatusToggle(order.orderId)} className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded">
                  Update Order <i className="fas fa-chevron-down"></i>
                </button>
                {statusDropdowns[order.orderId] && (
                  <div className="absolute bg-white border rounded mt-1 w-48 shadow-lg z-10">
                    {statuses.map((status, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${getStatusClass(status)}`}
                        onClick={() => updateOrderStatus(order.orderId, status)}
                      >
                        {status.replaceAll('_', ' ')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button 
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                onClick={() => handleViewDetails(order)} // Pass the order details to the handler
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
      {selectedOrder && <OrderDetail order={selectedOrder} />} {/* Render OrderDetail if selectedOrder is not null */}
    </>
  );
}
