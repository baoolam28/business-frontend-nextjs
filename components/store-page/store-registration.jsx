'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckIcon } from 'lucide-react'
import StoreInfo from "./store-infor"

export default function StoreRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    category: '',
    ownerName: '',
    email: '',
    bankAccount: '',
    logo: null,
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


  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateBankAccount = (bankAccount) => {
    return /^[0-9]{8,20}$/.test(bankAccount) // Basic validation for bank account number
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentStep === 5) {
      if (!validateBankAccount(formData.bankAccountNumber)) {
        setError("Invalid bank account number.")
        return
      }

      setError(null)
      // Simulate API call
      console.log('Form submitted:', formData)

      // Reset form or navigate to success page
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên cửa hàng</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Mặt hàng kinh doanh</Label>
              <Select 
                onValueChange={(value) => handleSelectChange(value, 'category')} 
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Tên quản lý</Label>
              <Input 
                id="ownerName" 
                name="ownerName" 
                value={formData.ownerName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">Tài khoản nhận tiền</Label>
              <Input 
                id="bankAccountNumber" 
                name="bankAccountNumber" 
                value={formData.bankAccountNumber} 
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
            <Button type="submit">Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
