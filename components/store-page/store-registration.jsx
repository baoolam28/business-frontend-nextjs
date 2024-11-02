'use client'

import { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckIcon } from 'lucide-react'
import SelectAddress from './SelectAddress'
import StoreInfo from "./store-infor"
import {useUser} from "../../context/UserContext" 
import { create } from 'domain'
import buyerApi from "../../api/buyer"
import {showSuccessAlert,showErrorAlert} from "../../utils/reactSweetAlert"

export default function StoreRegistration() {
  const {user} = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({

    storeName: '',
    storeAvatar: '',
    storeLocation: '',
    storeDescription: '',
    storeEmail: '',
    storeBankAccount: '',
    pickupAddress: '',
    province: '',
    district: '',
    wardCode: '',
    storeTaxCode: '',
    userId: '',
    managerName: ''

  })
  const [error, setError] = useState(null)
  const totalSteps = 5
  const steps = [
    "Store Information",
    "Store Details",
    "Owner Information",
    "Upload Documents",
    "Review"
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  
  }

  const handleSelectChange = (value, name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData(prevData => ({
      ...prevData,storeAvatar: file
    }))

    if (file && (file.size > 2 * 1024 * 1024 || !file.type.startsWith('image/'))) {
      setError("File must be an image and less than 2MB.");
      return;
    }

    setError(null);
    setFormData(prevData => ({
      ...prevData,
      [name]: file,
      logoUrl: URL.createObjectURL(file), // Create a URL for the uploaded image
    }));
  };


  useEffect(() => {
    if(user){
      setFormData(prevData =>({
        ...prevData,userId: user.id
      }))
    }
  },[user])

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateBankAccount = (bankAccount) => {
    return /^[0-9]{8,20}$/.test(bankAccount) // Basic validation for bank account number
  }

  // const handleSubmit = (e) => {
  //   // e.preventDefault()

  //   // if (currentStep === 5) {
  //   //   if (!validateBankAccount(formData.bankAccountNumber)) {
  //   //     setError("Invalid bank account number.")
  //   //     return
  //   //   }

  //   //   setError(null)
  //   //   // Simulate API call
  //   //   console.log('Form submitted:', formData)

  //   //   // Reset form or navigate to success page
  //   // }
  //   alert("cac anh liem")
//}
const handleSubmit = async (e) => {
  e.preventDefault();  // Ngăn chặn reload trang khi submit form
  
  // Kiểm tra dữ liệu cửa hàng hợp lệ
  if (!formData.storeName) {
    alert("Tên cửa hàng không được để trống!");
    return;
  }

  // Kiểm tra địa chỉ lấy hàng
  if (!formData.pickupAddress) {
    alert("Vui lòng nhập địa chỉ lấy hàng!");
    return;
  }

  // Kiểm tra email
  if (!formData.storeEmail || !/\S+@\S+\.\S+/.test(formData.storeEmail)) {
    alert("Vui lòng nhập email cửa hàng hợp lệ!");
    return;
  }

  
  

  // Chuẩn bị dữ liệu store để gửi
    const storeData = {
    storeName: formData.storeName,
    storeAvatar: formData.storeAvatar || null,
    storeLocation: formData.storeLocation,
    storeDescription: formData.storeDescription,
    storeEmail: formData.storeEmail,
    storeBankAccount: formData.storeBankAccount,
    pickupAddress: formData.pickupAddress,
    province: formData.province,
    district: formData.district,
    wardCode: formData.wardCode,
    storeTaxCode: formData.storeTaxCode,
    storeManager: formData.userId,
    managerName: formData.managerName
  };

  try {
    // Gọi API để tạo store
    const response = await buyerApi.store.createStore(storeData);
    
    if (response.storeManager == null) {
      // Hiển thị thông báo thành công
      console.log("Tạo cửa hàng thành công")
      
      showSuccessAlert("Thành công", "Cửa hàng tạo thành công") 

      // Nếu muốn xóa dữ liệu form sau khi tạo thành công:
    } else {
      showErrorAlert("Thất bại", "Tài khoản này đã tạo cửa hàng trước đó.") 
    }
  } catch (error) {
    console.error("Error during store creation:", error);
    showErrorAlert("Thất bại", "Tài khoản này đã tạo cửa hàng trước đó.") 
  }
};


  
  //  const createStore = async (storeData) => {
  //   try {
  //     const response = await buyerApi.store.createStore(storeData);
  
  //     if (response && response.storeId) {
  //       const createdStore = response;
  
  //       // Clear form data
  //       setFormData({});
  //       setSelectedStore(null);
  
  //       // Điều hướng đến trang quản lý cửa hàng với storeId mới
  //       router.push(`/store-management?storeId=${createdStore.storeId}`);
  //     } else {
  //       console.error("Unexpected response from createStore API:", response);
  //       alert("Đã xảy ra lỗi khi tạo cửa hàng. Vui lòng thử lại.");
  //     }
  //   } catch (error) {
  //     console.error("Error during store creation:", error);
  //     alert("Đã xảy ra lỗi khi thực hiện tạo cửa hàng. Vui lòng thử lại.");
  //   }
  // };
  
  
  const handleChangeAddress = (data) => {
    console.log('Form submitted:', data)
    setFormData((prev) => (
      {
        ...prev,
        province: data?.province,
        district: data?.district,
        wardCode: data?.wardCode,
        storeLocation: data?.storeLocation,
        pickupAddress: data?.storeLocation
      }))
  }
  
  const checkdata = () => {
    console.log('checkdata',formData)
  }
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {/* <button onClick={checkdata}>anhliem</button> */}
              <Label htmlFor="name">Tên cửa hàng</Label>
              <Input 
                id="storeName" 
                name="storeName" 
                value={formData.storeName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          <SelectAddress changeAddress={handleChangeAddress}/>
           
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea 
                id="storeDescription" 
                name="storeDescription" 
                value={formData.storeDescription} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Mã số thuế</Label>
              <Input 
                id="nastoreTaxCodeme" 
                name="storeTaxCode" 
                value={formData.storeTaxCode} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Tên quản lý</Label>
              <Input 
                id="managerName" 
                name="managerName" 
                value={formData.managerName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="storeEmail" 
                name="storeEmail" 
                type="email" 
                value={formData.storeEmail} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeBankAccount">Tài khoản nhận tiền</Label>
              <Input 
                id="storeBankAccount" 
                name="storeBankAccount" 
                value={formData.storeBankAccount} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo cửa hàng</Label>
              <Input 
                id="logo" 
                name="logo" 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        )
      case 5:
        console.log(formData)
        return (
          <StoreInfo storeInfo={formData} />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Đăng ký cửa hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                      index + 1 < currentStep
                        ? 'bg-primary border-primary text-primary-foreground'
                        : index + 1 === currentStep
                        ? 'border-primary text-primary'
                        : 'border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {index + 1 < currentStep ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-center">{step}</span>
                </div>
              ))}
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                <div 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500 ease-in-out"
                ></div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            variant="outline"
          >
            Back
          </Button>
          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNext}>Next</Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
