'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Label } from "@/components/ui/label"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BuyerAPI from "@/api/buyer"
import { useUser } from "@/context/UserContext"

export function LocationSelectorComponent({
  onSaveAddress
}) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [addressDetails, setAddressDetails] = useState('')
  const [address, setAddress] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            'token': process.env.NEXT_PUBLIC_GHN_TOKEN 
          }
        })
        if (response.data.code === 200) {
          setProvinces(response.data.data)
        } else {
          console.error('Failed to fetch provinces:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.post(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
            { province_id: parseInt(selectedProvince) },
            {
              headers: {
                'Content-Type': 'application/json',
                'Token': process.env.NEXT_PUBLIC_GHN_TOKEN
              }
            }
          )
          if (response.data.code === 200) {
            setDistricts(response.data.data)
            setSelectedDistrict('')
            setWards([])
          } else {
            console.error('Failed to fetch districts:', response.data.message)
          }
        } catch (error) {
          console.error('Error fetching districts:', error)
        }
      }
      fetchDistricts()
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.post(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
            { district_id: parseInt(selectedDistrict) },
            {
              headers: {
                'Content-Type': 'application/json',
                'Token': process.env.NEXT_PUBLIC_GHN_TOKEN
              }
            }
          )
          if (response.data.code === 200) {
            setWards(response.data.data)
            setSelectedWard('')
          } else {
            console.error('Failed to fetch wards:', response.data.message)
          }
        } catch (error) {
          console.error('Error fetching wards:', error)
        }
      }
      fetchWards()
    }
  }, [selectedDistrict])

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard && addressDetails) {
      const province = provinces.find(p => p.ProvinceID.toString() === selectedProvince)
      const district = districts.find(d => d.DistrictID.toString() === selectedDistrict)
      const ward = wards.find(w => w.WardCode === selectedWard)
      
      const fullAddress = `${addressDetails}, ${ward?.WardName}, ${district?.DistrictName}, ${province?.ProvinceName}`
      setAddress(fullAddress)
    }
  }, [selectedProvince, selectedDistrict, selectedWard, addressDetails, provinces, districts, wards])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (address && user) {
      const data = {
        userId: user.id,
        fullName,
        phoneNumber: phone,
        address,
        wardCode: selectedWard,
        disabled: false
      }
      try {
        const response = await BuyerAPI.shippingAddress.createShippingAddressByUserId(data)
        if (response.statusCode === 201) {
          onSaveAddress(response.data)
        }
      } catch (error) {
        console.error('Error creating shipping address:', error)
      }
    }
  }

  return (
    (<form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Tên người nhận</Label>
        <Input
          id="fullName"
          placeholder="Nhập tên người nhận"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input
          id="phone"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="province">Tỉnh Thành</Label>
        <Select onValueChange={setSelectedProvince} value={selectedProvince}>
          <SelectTrigger id="province">
            <SelectValue placeholder="Chọn Tỉnh Thành" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.ProvinceID} value={province.ProvinceID.toString()}>
                {province.ProvinceName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="district">Quận Huyện</Label>
        <Select
          onValueChange={setSelectedDistrict}
          value={selectedDistrict}
          disabled={!selectedProvince}>
          <SelectTrigger id="district">
            <SelectValue placeholder="Chọn Quận Huyện" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.DistrictID} value={district.DistrictID.toString()}>
                {district.DistrictName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ward">Phường Xã</Label>
        <Select
          onValueChange={setSelectedWard}
          value={selectedWard}
          disabled={!selectedDistrict}>
          <SelectTrigger id="ward">
            <SelectValue placeholder="Chọn Phường Xã" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="addressDetails">Số Nhà và Tên Đường</Label>
        <Input
          id="addressDetails"
          placeholder="Nhập số nhà và tên đường"
          value={addressDetails}
          onChange={(e) => setAddressDetails(e.target.value)}
          required />
      </div>
      <Button type="submit" className="w-full">
        Thêm địa chỉ
      </Button>
    </form>)
  );
}