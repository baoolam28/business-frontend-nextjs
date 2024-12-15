"use client"
import { CheckCircle } from 'lucide-react'
import { signOut } from "next-auth/react";
const StoreVerifying = () => {
    const handleLogout = async () => {
        await signOut();
    }
    return(
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
                <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Chờ xét duyệt !</h1>
                    <p className="text-gray-600 mb-8">
                        Cửa hàng của bạn đang chờ admin xét duyệt trong vòng 24h trân trọng cảm ơn.
                    </p>
                    <button
                        onClick={handleLogout}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                    Đăng xuất
                    </button>
                </div>
            </div>
        </>
    )
};

export default StoreVerifying;