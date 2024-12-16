"use client"
import { ShieldX  } from 'lucide-react'
const StoreLocked = () => {
    return(
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50">
                <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center">
                    <ShieldX  className="mx-auto h-16 w-16 text-red-500 mb-6" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Cửa hàng đã bị khóa!</h1>
                    <p className="text-gray-600 mb-8">
                        Cửa hàng của bạn đã bị khóa do vi phạm liên hệ admin để mở khóa.
                    </p>
                    <a
                    href="/login"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                    Hotline: 0394490356
                    </a>
                </div>
            </div>
        </>
    )
};

export default StoreLocked;