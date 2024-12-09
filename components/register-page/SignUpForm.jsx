import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {Button} from "../../components/ui/button"
import Image from "next/image";
import {Input} from "../../components/ui/input"
import Link from 'next/link'
import buyerAPI from '../../api/buyer'
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"

export default function SignUpForm() {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      phoneNumber: "",
      fullName: "",
      email: "",
    });
    const [errors, setErrors] = useState({});
    const router  = useRouter();
    
    const handleChange = (e) => {
      const { name, value } = e.target;

      if(name === "phoneNumber" && value.startsWith("0")){
        setFormData({
          ...formData,
          [name]: "84" + value.slice(1),
        });
      }else {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    };

    const validateForm = () => {
      const newErrors = {};
      if (!formData.username) {
        newErrors.username = "Username is required";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }
      if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be numeric";
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required"; // Kiểm tra xem email có được nhập không
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // Kiểm tra định dạng email
          newErrors.email = "Email is invalid"; // Thông báo lỗi nếu email không hợp lệ
      }
      return newErrors;
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // Submit form logic here
      const ValidationErorrs = validateForm();
      if(Object.keys(ValidationErorrs).length > 0){
        setErrors(ValidationErorrs)
        return;
      }
      setErrors([])

      sessionStorage.setItem("phoneNumber", formData.phoneNumber);
      sessionStorage.setItem("formData", JSON.stringify(formData));
      console.log("Phone Number:", formData.phoneNumber)
      router.push("/otp-verification")
    };
  
    const handleGoogleSignIn = async () => {
      // Handle Google sign-in logic here
      const data = await signIn("google",{redirect: false, callbackUrl:"http://localhost:3000/home-page"});
      console.log(data);
    };
  
    return (
        <main className="flex justify-center items-center min-h-screen bg-white p-8">
          <div className="flex flex-row gap-8 bg-white rounded-lg shadow-lg max-w-5xl w-full max-md:flex-col">
            {/* Image Section */}
            <section className="w-1/2 max-md:w-full">
              <img
                loading="lazy"
                src="https://www.rvsmedia.co.uk/wp-content/uploads/2023/02/Apparel-Industry_Article_2.jpg
"
                alt="Sign up illustration"
                width={800}
                height={600}
                className="object-full w-full h-full rounded-l-lg"
              />
            </section>
      
            {/* Form Section */}
            <section className="flex flex-col justify-center w-1/2 p-8 max-md:w-full max-md:px-6">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Sign up now</h1>
                <p className="text-lg font-medium text-gray-600 mt-2">
                  Enter your details to create your account
                </p>
              </div>
      
              <form onSubmit={onSubmit} className="space-y-6">

                {/* Fullname Input */}
                <Input
                  label="Full name"
                  placeholder="Enter your full name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}

                {/*User Name Input */}
                <Input
                  label="User name"
                  placeholder="Enter your user name"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                
                {/* Email Input */}
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}  
                
                {/* Phone Number Input */}
                <Input
                  label="Phone number"
                  placeholder="Enter your phone number"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber.startsWith("84") ? "0" + formData.phoneNumber.slice(2) : formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
      
                {/* Password Input */}
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  SIGN UP
                </button>
              </form>
      
              {/* Divider */}
              <div className="flex items-center justify-between my-6">
                <span className="h-px bg-gray-300 w-full"></span>
                <span className="px-4 text-sm font-medium text-gray-600">Or</span>
                <span className="h-px bg-gray-300 w-full"></span>
              </div>
      
              {/* Google Sign-In Button */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full py-3 bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 font-medium rounded-lg flex items-center justify-center"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>
      
              <p className="mt-6 text-center text-gray-600">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <button type="button" className="font-bold text-blue-600 hover:underline">
                    Sign in
                  </button>
                </Link>
                
              </p>
            </section>
          </div>
        </main>
      );
      
}
