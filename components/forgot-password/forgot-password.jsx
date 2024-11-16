import React, { useState, useEffect, useCallback  } from "react"
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import buyerAPI from '../../api/buyer'
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"
import Link from 'next/link'


export default function SendMail() {
    const router = useRouter();
    const [input, setInput] = useState("");
 
    const isPhoneNumber = (value) => {
        if(value.startsWith("0")){
            return "84" + (value.slice(1));
        }
        return value;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if(!input){
            showErrorAlert("Vui lòng nhập email hoặc số điện thoại");  
            return;
        }
        try {
            const formattedPhoneNumber = isPhoneNumber(input)
            console.log("phoneNumber", isPhoneNumber(input))
            if(/^\d{11,12}$/.test(formattedPhoneNumber)){
                sessionStorage.setItem("phoneNumber", formattedPhoneNumber);
                router.push("/otp-verification?isResetPassword=true");
            }else{
                const response = await buyerAPI.resetPassword.sendEmail({ email: input })
                console.log(response)
                if(response.statusCode === 200){
                    showSuccessAlert("Email đã gửi thành công!", response.message);
                    router.push("/login")
                }
            }
            
        } catch (error) {
            console.error("Error submitting form:", error);
            showErrorAlert("Failed to Send Email", error.message);
        }
    }

    return (
        <div className="min-h-screen bg-white-50 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <ShoppingBag className="h-8 w-8 text-black-500" />
                        <span className="ml-2 text-xl font-bold text-gray-800">Shop VN</span>
                    </div>
                    <a href="#" className="text-gray-500 transition-colors duration-200 flex items-center">
                        <HelpCircle className="mr-1" size={18} />
                        <span className="align-middle">Bạn cần giúp đỡ</span>
                    </a>
                </div>
            </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 md:p-10 rounded-lg shadow-2xl">
                <div className="mb-6 flex items-center">
                    <Link href="/login">
                     <ArrowLeft className="mr-3 cursor-pointer text-gray-500 hover:text-gray-600 transition-colors duration-200" size={28} />
                    </Link>
                    <h2 className="text-xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
                </div>
                <form onSubmit={handleSend} className="space-y-6 px-8" >
                    <div>
                        <input
                            id="emailOrPhone"
                            name="emailOrPhone"
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email or phone number"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>

    
    )
  }