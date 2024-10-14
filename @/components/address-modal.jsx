'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddressModalComponent({
  isOpen,
  onClose
}) {
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ city, province, district, street })
    onClose()
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Địa Chỉ Mới</DialogTitle>
          <Button variant="ghost" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">Thành phố</label>
            <Select onValueChange={setCity} value={city}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hochiminh">Hồ Chí Minh</SelectItem>
                {/* Add more cities as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="province" className="text-sm font-medium">Tỉnh thành</label>
            <Select onValueChange={setProvince} value={province}>
              <SelectTrigger id="province">
                <SelectValue placeholder="Chọn tỉnh thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dongNai">Đồng Nai</SelectItem>
                <SelectItem value="binhDuong">Bình Dương</SelectItem>
                {/* Add more provinces as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="district" className="text-sm font-medium">Quận huyện</label>
            <Select onValueChange={setDistrict} value={district}>
              <SelectTrigger id="district">
                <SelectValue placeholder="Chọn quận huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quan1">Quận 1</SelectItem>
                <SelectItem value="quan2">Quận 2</SelectItem>
                {/* Add more districts as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="street" className="text-sm font-medium">Số nhà, đường</label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Nhập số nhà, tên đường" />
          </div>
          <Button type="submit" className="w-full">Thêm địa chỉ</Button>
        </form>
      </DialogContent>
    </Dialog>)
  );
}