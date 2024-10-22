"use client"
import Menu from "../../components/component/menu"
import OrderCard from "./orderCard"
import OrderDetail from "./orderDetail"
const Orders = () => {
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
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md">Tất cả <span className="ml-2 bg-blue-200 text-blue-700 px-2 py-1 rounded-full">410</span></button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">chờ xác nhận <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full">36</span></button>
                            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md">chờ đóng gói <span className="ml-2 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full">40</span></button>
                            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md">chờ giao hàng<span className="ml-2 bg-purple-200 text-purple-700 px-2 py-1 rounded-full">334</span></button>
                            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md">Đơn đã hủy<span className="ml-2 bg-red-200 text-red-700 px-2 py-1 rounded-full">9999</span></button>
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md">Đơn thành công<span className="ml-2 bg-green-200 text-green-700 px-2 py-1 rounded-full">1</span></button>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="text" placeholder="Search" className="px-4 py-2 border rounded-md w-full" />
                            <button className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
                                <i className="fas fa-filter mr-2"></i> Filters
                            </button>
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex items-center space-x-2">
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">Select All</button>
                                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md flex items-center">
                                    <i className="fas fa-print mr-2"></i> Print
                                </button>
                                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md flex items-center">
                                    <i className="fas fa-edit mr-2"></i> Update Order <i className="fas fa-caret-down ml-2"></i>
                                </button>
                                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md flex items-center">
                                    <i className="fas fa-download mr-2"></i>
                                </button>
                                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md flex items-center">
                                    <i className="fas fa-trash mr-2"></i>
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                            </div>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center">
                                    Giao hàng loạt
                                </button>
                        </div>
                        <OrderCard/>
                        <OrderCard/>
                        <OrderCard/>

                        <OrderDetail/>
                    </div>
                </div>     
                </main>
            </div>
        </>
        
    );
};

export default Orders;
