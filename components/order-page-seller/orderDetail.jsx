import React from 'react'

export default function orderDetail({order }) {
  return (
    <div>
        <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-500">
                                <a href="#" className="text-blue-500">Sale</a> &gt; <a href="#" className="text-blue-500">Order</a> &gt; <a href="#" className="text-blue-500">Order Details</a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Print Shipping Label</button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Request Pickup</button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Print Order</button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit Order</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Order {order.orderId}</h1>
                            <span className="text-sm text-gray-500">{order.orderDate}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{order.status.replaceAll('_', ' ')}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h2 className="text-lg font-bold mb-4">Order Details</h2>
                                    <div className="space-y-4">
                                        {order.orderDetails.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                            <img src={item.imageUrl || "https://placehold.co/60x60"} alt={item.productName} className="w-16 h-16 rounded mr-4" />
                                            <div className="flex-1">
                                                <div className="font-bold">{item.productName}</div>
                                                <div className="text-sm text-gray-500">SKU: <a href="#" className="text-blue-500">{item.sku}</a></div>
                                                <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                                            </div>
                                            <div className="font-bold">{item.price.toLocaleString('vi-VN')} đ</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <div>Subtotal</div>
                                        <div className="font-bold">{order.orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <div>Total</div>
                                        <div>{(order.orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)).toLocaleString('vi-VN')} đ</div>
                                    </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h2 className="text-lg font-bold mb-4">Order History</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                                            <div>
                                                <div className="font-bold">Order Created</div>
                                                <div className="text-sm text-gray-500">21 Sep,2022 at 4:49</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                                            <div>
                                                <div className="font-bold">Order status was changed to</div>
                                                <div className="text-sm text-gray-500">Status: <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Quick Buy</span></div>
                                                <div className="text-sm text-gray-500">New 13 Sep,2022 at 8:58</div>
                                                <div className="text-sm text-gray-500">Quick Buy 13 Sep,2022 at 8:58</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Customer Info</h2>
                                        <button className="text-blue-500">Edit</button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/40x40" alt="Customer profile" className="w-10 h-10 rounded-full mr-4"/>
                                            <div>
                                                <div className="font-bold">User A</div>
                                                <div className="text-sm text-gray-500">Phone: 0911835993</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Shipping Info</h2>
                                        <button className="text-blue-500">Edit</button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">Address: 344a Bùi Thị Điệt , ấp 3 , Phạm Văn Cội , Củ Chi  ,TP Hồ Chí Minh</div>
                                        <div className="text-sm text-gray-500">Phone: 0911835993</div>
                                        <a href="#" className="text-blue-500">View map</a>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Payment Info</h2>
                                        <button className="text-blue-500">Edit</button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">Payment Method: true</div>
                                        <div className="text-sm text-gray-500">Payment Transaction №: <a href="#" className="text-blue-500">0911835993</a></div>
                                        <a href="#" className="text-blue-500">View Transactions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}
