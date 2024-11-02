"user client"
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
import BuyerAPI from "../../api/buyer";
import { useUser } from "../../context/UserContext"
const LocationSelector = ({onSaveAddress}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [address, setAddress] = useState([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState(''); 
  const { user } = useUser();
  // Lấy danh sách tỉnh thành
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        console.log(process.env.NEXT_PUBLIC_GHN_TOKEN)
        const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            'token': process.env.NEXT_PUBLIC_GHN_TOKEN 
          }
        });
        console.log(response)

        if (response.data.code === 200) {
          setProvinces(response.data.data); // response.data.data để lấy danh sách tỉnh
          console.log('Get provinces success');
        } else {
          console.error('Failed to fetch provinces, status code:', response.message);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  // Khi tỉnh thành được chọn, lấy danh sách quận huyện
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            province_id: selectedProvince // Gửi dữ liệu với province_id
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Token': process.env.NEXT_PUBLIC_GHN_TOKEN // Thay 'YOUR_API_TOKEN_HERE' bằng token thực tế của bạn
            }
          });

          if (response.data.code === 200) {
            setDistricts(response.data.data);
            setWards([]); // Xóa danh sách phường khi thay đổi quận
            console.log('Get districts success');
          } else {
            console.error('Failed to fetch districts, error code:', response.message);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvince]);

  // Khi quận huyện được chọn, lấy danh sách phường xã
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            district_id: selectedDistrict // Gửi dữ liệu với district_id
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Token': process.env.NEXT_PUBLIC_GHN_TOKEN // Thay token thực tế của bạn ở đây
            }
          });

          if (response.data.code === 200) {
            setWards(response.data.data);
            console.log('Get wards success');
          } else {
            console.error('Failed to fetch wards, error code:', response.message);
          }
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      };

      fetchWards();
    }
  }, [selectedDistrict]);

  useEffect(() => {

    if (selectedProvince && selectedDistrict && selectedWard && addressDetails) {
    // Tìm ProvinceName
    const province = provinces.find(p => p.ProvinceID === selectedProvince);
    const provinceName = province ? province.ProvinceName : '';

    // Tìm DistrictName
    const district = districts.find(d => d.DistrictID === selectedDistrict);
    const districtName = district ? district.DistrictName : '';

    // Tìm WardName
    const ward = wards.find(w => w.WardCode === selectedWard);
    const wardName = ward ? ward.WardName : '';

    // Tạo địa chỉ hoàn chỉnh
    const fullAddress = `${addressDetails}, ${wardName}, ${districtName}, ${provinceName}`;
    setAddress(fullAddress); setAddress(fullAddress);

    
  }

  },[selectedProvince, selectedDistrict, selectedWard, addressDetails]);

  // Xử lý sự kiện gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    if(address && user){
      const data = {
        userId: user.id,
        fullName: fullName,
        phoneNumber: phone,
        address: address,
        province: selectedProvince,
        district: selectedDistrict,
        wardCode: selectedWard,
        disabled: false
      }

      console.log(JSON.stringify(data));

      const createBuyerAddress = async (data) => {
        try {
          const response = await BuyerAPI.shippingAddress.createShippingAddressByUserId(data);
          if(response.statusCode === 201  ){
            onSaveAddress(response.data);
            console.log(response.data);
          }
        } catch (error) {

        }
      }

      createBuyerAddress(data);

    }
  };

  const getProvinceNameById = (id) => {
    const province = provinces.find((p) => p.ProvinceID === id);
    return province ? province.ProvinceName : "";
  };

  const getDistrictNameById = (id) => {
    const district = districts.find((d) => d.DistrictID === id);
    return district ? district.DistrictName : "";
  };

  const getWardNameById = (id) => {
    const ward = wards.find((w) => w.WardCode === id);
    return ward ? ward.WardName : "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="addressDetails">Tên người nhận</Label>
        <Input
          id="addressDetails"
          placeholder="Nhập số nhà và tên đường"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="addressDetails">Số điện thoại</Label>
        <Input
          id="addressDetails"
          placeholder="Nhập số nhà và tên đường"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="province">Tỉnh Thành</Label>
        <Select value="Chọn Tỉnh Thành" onValueChange={(value) => setSelectedProvince(value)} required>
          <SelectTrigger id="province">
            <SelectValue>{getProvinceNameById(selectedProvince) || "Chọn Tỉnh Thành"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">Quận Huyện</Label>
        <Select value="Chọn Quận Huyện" onValueChange={(value) => setSelectedDistrict(value)} disabled={!selectedProvince} required>
          <SelectTrigger id="district">
            <SelectValue>{getDistrictNameById(selectedDistrict) || "Chọn Quận Huyện"}</SelectValue> 
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ward">Phường Xã</Label>
        <Select value="Chọn Phường Xã" onValueChange={(value) => setSelectedWard(value)} disabled={!selectedDistrict} required>
          <SelectTrigger id="ward">
            <SelectValue>{getWardNameById(selectedWard) || "Chọn Phường Xã"}</SelectValue> 
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.WardCode} value={ward.WardCode  }>
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
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Thêm địa chỉ
      </Button>
    </form>
  );
};

export default LocationSelector;
