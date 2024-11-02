
import React, { useState, useEffect, useCallback  } from "react"
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import buyerAPI from '../../api/buyer'
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const router  = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("")
  const [formData, setFormData] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [hasRequestedOtp, setHasRequestedOtp] = useState(false);

  useEffect(() =>{
    const storagePhoneNumber = sessionStorage.getItem("phoneNumber")
    const storageFormData = sessionStorage.getItem("formData");
    console.log("storagePhoneNumber", storagePhoneNumber)
    if(storagePhoneNumber){
      setPhoneNumber(storagePhoneNumber);
    }
    if (storageFormData) {
      setFormData(JSON.parse(storageFormData)); // Chuyển đổi lại thành đối tượng
    }
  }, []);

  useEffect(() => {
    if (phoneNumber && !hasRequestedOtp) {
      handleRequestOtp(phoneNumber);
      setHasRequestedOtp(true);
    }
  }, [phoneNumber, hasRequestedOtp]);

  const handleRequestOtp = useCallback(async (phoneNumber) => {
    console.log("Requesting OTP for Phone Number:", phoneNumber);
    try {
      const response = await buyerAPI.otp.sendOtp(phoneNumber);
      if(response.statusCode === 200){
        const expiryTimeString = response.data.expiryTime;
        console.log("Expiry Time String:", expiryTimeString);


        const expiryTime = new Date(response.data.expiryTime).getTime();
        const currentTime = Date.now();
        const timeRemaining = Math.floor((expiryTime - currentTime) / 1000);

        console.log("Current Time:", new Date(currentTime).toLocaleString());
        console.log("Expiry Time:", new Date(expiryTime).toLocaleString());
        console.log("Time Remaining:", timeRemaining);

        if (timeRemaining > 0) {
          setTimeLeft(timeRemaining);
          startCountdown(timeRemaining); // Khởi động đếm ngược
        } else {
          showErrorAlert("Thất bại", "OTP đã hết hạn.");
        }

        showSuccessAlert("OTP đã được gửi", "OTP đã được gửi tới số điện thoại của bạn.")
      }else{
        showErrorAlert("Thất bại", "Yêu cầu OTP không thành công.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorAlert("Lỗi", "Không thể gửi OTP.");
    }
  },[]);

  const startCountdown = (initialTime) => {
     // Dọn dẹp interval cũ nếu có
     if (intervalId) {
      clearInterval(intervalId);
    }

    let timeRemaining = initialTime;

    const id = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(id);
        setTimeLeft(0);
      } else {
        timeRemaining -= 1; // Giảm thời gian còn lại mỗi giây
        setTimeLeft(timeRemaining); // Cập nhật trạng thái
      }
    }, 1000);

    setIntervalId(id);
  };

  const handleChange = (element, index) => {
    if (isNaN(Number(element.target.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))])

    if (element.target.value && element.target.nextSibling) {
      (element.target.nextSibling).focus()
    }
  }

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    console.log("Phone Number:", phoneNumber);
    // Add your OTP verification logic here
    try {
      const response = await buyerAPI.otp.verifyOtp({phoneNumber: phoneNumber, otpCode: enteredOtp})
      console.log("Full response: ", response.data)
      if(response.statusCode === 200){
        const registerResponse  = await buyerAPI.register.createNewUser(formData); // Giả định dữ liệu từ trang Đăng Ký
        if(registerResponse .statusCode === 200){
          showSuccessAlert("Thành công", "Bạn đã đăng ký thành công!");
          router.push("/login");
        }else{
          showErrorAlert("Thất bại", "Bạn đã đăng ký thất bại!");
        }
      }else{
        showErrorAlert("Thất bại", "Xác minh OTP không thành công.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      showErrorAlert("Lỗi", "Đã có lỗi khi xác minh OTP.");
    }
  }

  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-white text-white p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">OTP Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center mb-6">Enter the code we just send on your mobile phone: 
            <span> +{phoneNumber}</span>
          </p>
          <p className="text-gray-400 text-center mb-6">
            OTP will expire at: 
            <span>
              {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
            </span>
          </p>
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                className="
                  w-14 h-14 text-center text-xl
                  bg-gray-50 text-gray-800 
                  border border-gray-300 
                  rounded-lg shadow-sm
                  focus:border-transparent focus:outline-none
                  focus:ring-2 focus:ring-blue-400
                  transition duration-150 ease-in-out
                  transform hover:scale-105 focus:scale-110
                "
                value={data}
                onChange={e => handleChange(e, index)}
                onFocus={e => e.target.select()} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleVerify}>
            Verify OTP
          </Button>
          <button
            className="text-blue-400 hover:text-blue-300 text-sm"
            onClick={() => handleRequestOtp(phoneNumber)}>
            Didn't receive code? Resend Code
          </button>
        </CardFooter>
      </Card>
    </div>)
  );
}