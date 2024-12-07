import React ,{useEffect , useState}from 'react';
import { Label } from "../../components/ui/label";
import axios from 'axios';
import { Input } from '../../components/ui/input'; 
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem}  from '../../components/ui/select'
const SelectAddress = ({changeAddress}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [addressDetails,setAddressDetails] = useState('');
    const [fullAddress, setFullAdress] = useState('');
    const [address, setAddress] = useState([]);

    
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

    
    useEffect(() => {
        // console.log("province_id: "+ selectedProvince);
        // console.log("district_id: "+ selectedDistrict);
        // console.log("wardCode: "+ selectedWard);
        // console.log("addressDetails:"+ addressDetails);
        if (selectedProvince && selectedDistrict && selectedWard && addressDetails){
        const province = provinces.find(p => p.ProvinceID === selectedProvince);
        const provinceName = province ? province.ProvinceName : "";

        const district = districts.find(d => d.DistrictID === selectedDistrict);
        const districtName = district ? district.DistrictName : "";

        const ward = wards.find(w => w.DistrictID === selectedDistrict);
        const wardName = ward ? ward.WardName : "";

        const fullAddress=`${addressDetails}, ${wardName}, ${districtName}, ${provinceName}`;
        setFullAdress(fullAddress);
        
        const data = {
            province: selectedProvince,
            district: selectedDistrict,
            wardCode: selectedWard,
            storeLocation: fullAddress 
        }
        changeAddress(data);

        }
      

    },[selectedProvince, selectedDistrict, selectedWard, addressDetails]);

    return (

        <div>
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
              <Label htmlFor="address">Địa chỉ cửa hàng</Label>
              <Input 
                id="address" 
                name="address" 
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                required 
              />
            </div>
         </div>
        
    );
}

export default SelectAddress;
