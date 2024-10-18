import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from "../../components/ui/label";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input'; // Thêm Input component

const LocationSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [addressDetails, setAddressDetails] = useState(''); // Thêm state cho địa chỉ chi tiết

  // Lấy danh sách tỉnh thành
  useEffect(() => {
    axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  // Khi tỉnh thành được chọn, lấy danh sách quận huyện
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then(response => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
            setWards([]);  // Xóa phường khi thay đổi quận
          }
        })
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedProvince]);

  // Khi quận huyện được chọn, lấy danh sách phường xã
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then(response => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch(error => console.error('Error fetching wards:', error));
    }
  }, [selectedDistrict]);

  // Xử lý sự kiện gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    const locationData = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      address: addressDetails, // Địa chỉ chi tiết
    };
    console.log('Location Data:', locationData);
    // Thực hiện các hành động khác như gửi data lên server, v.v.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="province">Tỉnh Thành</Label>
        <Select onValueChange={(value) => setSelectedProvince(value)}>
          <SelectTrigger id="province">
            <SelectValue placeholder="Chọn Tỉnh Thành" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.id} value={province.id}>
                {province.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">Quận Huyện</Label>
        <Select onValueChange={(value) => setSelectedDistrict(value)} disabled={!selectedProvince}>
          <SelectTrigger id="district">
            <SelectValue placeholder="Chọn Quận Huyện" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ward">Phường Xã</Label>
        <Select onValueChange={(value) => setSelectedWard(value)} disabled={!selectedDistrict}>
          <SelectTrigger id="ward">
            <SelectValue placeholder="Chọn Phường Xã" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.id} value={ward.id}>
                {ward.full_name}
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
          onChange={(e) => setAddressDetails(e.target.value)} // Cập nhật state
        />
      </div>

      <Button type="submit" className="w-full">
        Thêm địa chỉ
      </Button>
    </form>
  );
};

export default LocationSelector;
