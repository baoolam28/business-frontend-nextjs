import React, {useState} from "react";
import {Input} from "../../components/ui/input"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {showSuccessAlert, showErrorAlert} from "../../utils/reactSweetAlert"
import {Button} from "../../components/ui/button"
import Image from "next/image";
import Link from 'next/link'

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [userId, setUserId] = useState(null);
    
      const router = useRouter();
    
    
      const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = await signIn("credentials", {email, password, redirect: false});
    
        if (data.error) {
          showErrorAlert("Đăng nhập thất bại","sai tên tài khoản hoặc mật khẩu")
        }
         else { 
          router.push("/home-page");
        }
      };
    
      const handleGoogleSignIn = async () => {
        const data = await signIn("google",{redirect: false, callbackUrl:"http://localhost:3000/home-page"});
        console.log(data);
      };

    return (
      <main className="flex justify-center items-center min-h-screen bg-white p-8">
        <div className="flex flex-row gap-8 bg-white rounded-lg shadow-lg max-w-5xl w-full max-md:flex-col">
          <section className="w-1/2 max-md:w-full">
            <Image
              loading="lazy"
              src="/placeholder.svg"
              alt="Login illustration"
              width={800}
              height={600}
              className="object-cover w-full h-full rounded-l-lg"
            />
          </section>
  
          <section className="flex flex-col justify-center w-1/2 p-8 max-md:w-full max-md:px-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-lg font-medium text-gray-600 mt-2">Enter your credentials to access your account</p>
            </div>
  
              <form onSubmit={onSubmit} className="space-y-6">
                <Input
                  label="Email"
                  placeholder="Enter your username"
                  type="text"
                  id="email"
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <Input
                  label="Password"
                  placeholder="Enter your passsword"
                  type="password"
                  id="password"
                  required  
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
  
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded mr-2" />
                    <span>Remember me</span>
                  </label>
                  <Link href= "/send-mail">
                    <button type="button" className="text-blue-600 hover:underline">Forgot password</button>
                  </Link>
                 
                </div>
  
                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition duration-200" 
                >
                    LOGIN
                </button>
              </form>
  
               {/* Divider */}
                <div className="flex items-center justify-between my-6">
                    <span className="h-px bg-gray-300 w-full"></span>
                    <span className="px-4 text-sm font-medium text-gray-600">Or</span>
                    <span className="h-px bg-gray-300 w-full"></span>
                </div>
  
             
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
                Don't have an account?{" "}
                <Link href={"/register"}>
                  <button type="button" className="font-bold text-blue-600 hover:underline">
                    Sign up
                  </button>
                </Link>
               
              </p>
        </section>
        </div>
      </main>
    );
  }