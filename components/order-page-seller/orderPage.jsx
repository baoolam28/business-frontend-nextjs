"use client"
import React, { useEffect, useState } from "react";
import Menu from "../../components/component/menu"
import OrderCard from "./orderCard"
import {showSuccessAlert ,  showErrorAlert} from "../../utils/reactSweetAlert"
import {useStore} from "../../context/StoreContext"
import sellerAPI from "../../api/seller";
import OrderAPI from "../../api/seller"

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { storeId } = useStore()
    console.log("id Store" + storeId)
    const [selectedStatus, setSelectedStatus] = useState(''); 
    const totalOrders = orders.length;
    const [choxacnhan, setChoxacnhan] = useState('');
    const [danggiaohang , setDanggiaohang] = useState('');
    const [dangdonggoi , setDangdonggoi] = useState('');
    const [giaohangthanhcong , setGiaohangthanhcong] = useState('');
    const [donhuy , setDonhuy] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [selectedOrders, setSelectedOrders] = useState(new Set());
    useEffect(() => {
        if (storeId == null) return;
        fetchOrders();
    }, [storeId]);

    useEffect(() => {
        setChoxacnhan(orders.filter(order => order.status === 'CHO_XAC_NHAN').length)
        setDanggiaohang( orders.filter(order => order.status === 'DANG_GIAO_HANG').length)
        setDangdonggoi(orders.filter(order => order.status === 'DANG_DONG_GOI').length)
        setGiaohangthanhcong(orders.filter(order => order.status === 'GIAO_HANG_THANH_CONG').length)
        setDonhuy(orders.filter(order => order.status === 'DON_HUY').length)
    },[orders])

    const fetchOrders = async () => {
        try {
            const response = await sellerAPI.order.getOrdersOnlineByStoreId(storeId);
            if (response.statusCode === 200) {
                setOrders(response.data);
            } else {
                console.warn(`Received status code: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleBulkDelivery = async () => {
        try {
            const orderIds = Array.from(selectedOrders); // Lấy mảng ID của các đơn hàng đã chọn
            const response = await OrderAPI.order.udateOrderByStoreID(storeId, 'DANG_GIAO_HANG');
    
            if (response.statusCode === 200) { // Kiểm tra mã trạng thái
                console.log(`Bulk delivery status updated for orders: ${orderIds}`);
                showSuccessAlert("Thành công", "Cập nhật trạng thái giao hàng loạt thành công");
                fetchOrders(); // Làm mới danh sách đơn hàng
                setSelectedOrders(new Set()); // Xóa danh sách đơn hàng đã chọn sau khi cập nhật thành công
            } else {
                console.error(`Failed to update bulk order status: ${response.status}`); // Xử lý lỗi nếu mã trạng thái không phải 200
                showErrorAlert("Lỗi", "Cập nhật trạng thái giao hàng loạt không thành công");
            }
        } catch (error) {
            console.error("Failed to update bulk order status:", error);
            showErrorAlert("Lỗi", "Đã xảy ra lỗi trong quá trình cập nhật trạng thái giao hàng loạt");
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await OrderAPI.order.updateOrderById(orderId, newStatus);
            console.log(`Order ${orderId} status updated to ${newStatus}`);

            // Optionally update the local state immediately
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            showSuccessAlert("Thành công", "Cập nhật trạng thái thành công");
            fetchOrders()
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    useEffect(() => {
        let filtered;
        if (filter === "ALL") {
            filtered = orders;
        } else {
            filtered = orders.filter(order => order.status === filter);
        }
        setFilteredOrders(filtered);
    }, [filter, orders]);

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Menu />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="p-4">
                        <div className="p-6 bg-gray-50 min-h-screen">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">Orders</h1>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
                                        <i className="fas fa-download mr-2"></i> Export All
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
                                        <i className="fas fa-plus mr-2"></i> Create Order
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-4 mb-4">
                                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md" onClick={() => setSelectedStatus('')}>
                                    Tất cả <span className="ml-2 bg-blue-200 text-blue-700 px-2 py-1 rounded-full">{totalOrders}</span>
                                </button>
                                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={() => setSelectedStatus('CHO_XAC_NHAN')}>
                                    Chờ xác nhận <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{choxacnhan}</span>
                                </button>
                                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md" onClick={() => setSelectedStatus('DANG_DONG_GOI')}>
                                    Chờ đóng gói <span className="ml-2 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full">{dangdonggoi}</span>
                                </button>
                                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md" onClick={() => setSelectedStatus('DANG_GIAO_HANG')}>
                                    Chờ giao hàng<span className="ml-2 bg-purple-200 text-purple-700 px-2 py-1 rounded-full">{danggiaohang}</span>
                                </button>
                                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md" onClick={() => setSelectedStatus('DON_HUY')}>
                                    Đơn đã hủy <span className="ml-2 bg-red-200 text-red-700 px-2 py-1 rounded-full">{donhuy}</span>
                                </button>
                                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md" onClick={() => setSelectedStatus('GIAO_HANG_THANH_CONG')}>
                                    Đơn thành công <span className="ml-2 bg-green-200 text-green-700 px-2 py-1 rounded-full">{giaohangthanhcong}</span>
                                </button>
                            </div>
                            <div className="flex items-center mb-4">
                            <input type="text" placeholder="Search" className="px-4 py-2 border rounded-md w-full" />
                            <button className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
                                <i className="fas fa-filter mr-2"></i> Filters
                            </button>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">Select All</button>
                                    <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md flex items-center">
                                        <i className="fas fa-print mr-2"></i> Print
                                    </button>
                                </div>
                                {/* Nút Giao hàng loạt chỉ hiển thị khi status là 'DANG_DONG_GOI' */}
                                {selectedStatus === 'DANG_DONG_GOI' && (
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"  onClick={handleBulkDelivery}>
                                        Giao hàng loạt
                                    </button>
                                )}
                            </div>
                            <OrderCard orders={orders.filter(order => !selectedStatus || order.status === selectedStatus)}  updateOrderStatus={updateOrderStatus} />
                        </div>
                    </div>     
                </main>
            </div>
        </>
    );
};

export default Orders;
