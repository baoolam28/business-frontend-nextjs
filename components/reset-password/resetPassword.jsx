import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert" // Giả sử bạn có sẵn hàm này
import buyerAPI from '../../api/buyer'

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const encodedEmail = searchParams.get("email"); 
    const isReset = searchParams.get("isResetPassword") === "true";
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log("Encoded email from URL:", encodedEmail);
    useEffect(() => {
        const storagePhoneNumber = sessionStorage.getItem("phoneNumber")
        if(storagePhoneNumber){
            setPhoneNumber(storagePhoneNumber)
        }
        else if(encodedEmail){
            try {
                // Giải mã email từ Base64
                const decodedEmail = atob(encodedEmail);
                const [randomToken, encodedEmailPart] = decodedEmail.split(":");
                console.log("Random token:", randomToken);
                console.log("Encoded email part:", encodedEmailPart);
                setEmail(encodedEmailPart); // Lưu email đã giải mã vào state
            } catch (error) {
                console.error("Error decoding email:", error);
                showErrorAlert("Đường dẫn không hợp lệ", error.message);
            }
        }else {
            showErrorAlert("Thiếu thông tin", "Vui lòng thử đặt lại mật khẩu.");
            router.push("/send-mail");
        }
    },[encodedEmail, router])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xem mật khẩu có trùng khớp không
        if (newPassword !== confirmPassword) {
            showErrorAlert("Mật khẩu không khớp", "Vui lòng xác nhận lại mật khẩu!");
            return;
        }

        try {
            if(isReset){
                const response = await buyerAPI.resetPassword.resetPasswordPhoneNumber({ phoneNumber, newPassword });
                if(response.statusCode === 200){
                    showSuccessAlert("Mật khẩu đã được cập nhật", "Vui lòng đăng nhập lại.");
                    router.push("/login");  // Chuyển hướng về trang login sau khi thay đổi mật khẩu
                } else {
                    showErrorAlert("Lỗi khi cập nhật mật khẩu", response.message);
                }
            }else{
                const response = await buyerAPI.resetPassword.resetPasswordEmail({ email, newPassword });
                if (response.statusCode === 200) {
                    showSuccessAlert("Mật khẩu đã được cập nhật", "Vui lòng đăng nhập lại.");
                    router.push("/login");  // Chuyển hướng về trang login sau khi thay đổi mật khẩu
                } else {
                    showErrorAlert("Lỗi khi cập nhật mật khẩu", response.message);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showErrorAlert("Failed to new password", error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-6">
            {/* Navigation and Content */}
            <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="newPassword" className="text-gray-700 font-semibold">Mật khẩu mới</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-gray-700 font-semibold">Xác nhận mật khẩu mới</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-2 block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Cập nhật mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
