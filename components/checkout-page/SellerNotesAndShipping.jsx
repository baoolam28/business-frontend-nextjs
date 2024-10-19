import { useEffect, useState } from "react";
import { Truck, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import FormatVND from "../../utils/formatVND"
import axios from "axios";

export default function SellerNotesAndShipping({ orderData, selectedAddress, onShippingData }) {
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [productParameters, setProductParameters] = useState([]);
  const [serviceFee, setServiceFee] = useState(0);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("fast");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);
  useEffect(() => {
    if (!orderData || !selectedAddress) {
      setServiceFee(0);
      return;
    }

    setServiceFee(0);
    setSelectedShipping(selectedAddress);
    setProductParameters([]);

    const storeMap = {};

    // Organize items by store
    orderData.forEach((item) => {
      const storeKey = item.storeId;
      if (!storeMap[storeKey]) {
        storeMap[storeKey] = [];
      }
      storeMap[storeKey].push(item);
    });

    // Aggregate product parameters for each store
    const aggregatedParameters = Object.keys(storeMap).map((storeKey) => {
      const items = storeMap[storeKey];
      return items.reduce(
        (acc, item) => ({
          height: acc.height + item.height,
          width: acc.width + item.width,
          length: acc.length + item.length,
          weight: acc.weight + item.weight,
          district: item.district,
        }),
        {
          height: 0,
          width: 0,
          length: 0,
          weight: 0,
          district: items[0].district,
        }
      );
    });

    setProductParameters(aggregatedParameters);
  }, [orderData, selectedAddress]);

  useEffect(() => {
    if (productParameters.length < 1) return;

    let totalServiceFee = 0;

    // Use Promise.all to handle multiple service fee calculations
    Promise.all(
      productParameters.map(async (params) => {
        const serviceId = await fetchServiceFee(params);
        if (serviceId != null) {
          const fee = await fetchCalculateFee(params, serviceId);
          totalServiceFee += fee || 0;

          // Fetch delivery time after calculating the service fee
          const deliveryTime = await fetchDeliveryTime(params, serviceId);
          if (deliveryTime) {
            setEstimatedDelivery(deliveryTime)
            setEstimatedDeliveryDate(convertTimestampToDate(deliveryTime));
            onShippingData(fee, deliveryTime, selectedShippingMethod)
          }
        }
      })
    ).then(() => {
      setServiceFee(totalServiceFee);
    });
  }, [productParameters]);

  const fetchCalculateFee = async (params, serviceId) => {
    try {
      const data = {
        service_id: serviceId,
        insurance_value: 500000,
        coupon: null,
        from_district_id: Number(params.district),
        to_district_id: Number(selectedShipping.district),
        to_ward_code: selectedShipping.wardCode,
        height: params.height,
        length: params.length,
        weight: params.weight,
        width: params.width,
      };

      console.log("Calculating fee with data:", JSON.stringify(data));

      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.NEXT_PUBLIC_GHN_TOKEN,
            shop_id: process.env.NEXT_PUBLIC_SHOP_ID,
          },
        }
      );

      if (response.data.code === 200) {
        console.log("Service fee:", response.data.data.service_fee);
        return response.data.data.service_fee;
      } else {
        console.error("Failed to fetch shipping fee:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching calculate fee:", error.message);
    }

    return 0;
  };

  const fetchServiceFee = async (params) => {
    try {
      const data = {
        shop_id: Number(process.env.NEXT_PUBLIC_SHOP_ID),
        from_district: Number(params.district),
        to_district: Number(selectedShipping.district),
      };

      console.log("Fetching available services with data:", JSON.stringify(data));

      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.NEXT_PUBLIC_GHN_TOKEN,
          },
        }
      );

      if (response.data.code === 200 && Array.isArray(response.data.data)) {
        const availableServices = response.data.data;

        if (availableServices.length === 0) {
          console.warn("No shipping services available for the given districts.");
          return null;
        }

        // Select the service based on weight
        if (params.weight < 5000) {
          const lightService = availableServices.find(
            (service) => service.short_name === "Hàng nhẹ"
          );
          return lightService ? lightService.service_id : null;
        } else {
          const heavyService = availableServices.find(
            (service) => service.short_name === "Hàng nặng"
          );
          return heavyService ? heavyService.service_id : null;
        }
      } else {
        console.error("Failed to fetch available services:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching service fee:", error.message);
    }

    return null;
  };

  const fetchDeliveryTime = async (params, serviceId) => {
    try {
      const data = {
        from_district_id: Number(params.district),
        from_ward_code: params.wardCode,
        to_district_id: Number(selectedShipping.district),
        to_ward_code: selectedShipping.wardCode,
        service_id: serviceId,
      };

      console.log("Fetching delivery time:", data);

      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.NEXT_PUBLIC_GHN_TOKEN,
            shop_id: Number(process.env.NEXT_PUBLIC_SHOP_ID),
          },
        }
      );

      if (response.data.code === 200) {
        
        return response.data.data.leadtime; 
      } else {
        console.error("Failed to fetch delivery time:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching delivery time:", error.message);
    }

    return null; // Return null in case of an error
  };

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return date.toLocaleDateString('vi-VN', options); 
  };

  const handleShippingMethodChange = (event) => {
    setSelectedShippingMethod(event.target.value);
  };

  useEffect(() => {
    if (selectedShippingMethod === "economical") {
      const deliveryTime = estimatedDelivery + 5 * 24 * 60 * 60
      setEstimatedDelivery(deliveryTime);
      setEstimatedDeliveryDate(convertTimestampToDate(deliveryTime));

      // export fee and delivery time
      onShippingData(serviceFee * 0.8, deliveryTime, selectedShippingMethod)
    }else{
      setEstimatedDeliveryDate(convertTimestampToDate(estimatedDelivery));
      // export fee and delivery time
      onShippingData(serviceFee, estimatedDelivery, selectedShippingMethod)
    }

  },[selectedShippingMethod])

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <Label htmlFor="seller-note">Lưu ý cho người bán</Label>
        <Input id="seller-note" placeholder="Nhập lưu ý của bạn ở đây" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Phương thức vận chuyển</h3>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id="fast-shipping"
            name="shipping-method"
            value="fast"
            className="mr-2"
            onChange={handleShippingMethodChange}
            checked={selectedShippingMethod === "fast"}
          />
          <label htmlFor="fast-shipping" className="text-sm text-gray-700">Giao hàng nhanh {FormatVND(serviceFee)}</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="economical-shipping"
            name="shipping-method"
            value="economical"
            className="mr-2"
            onChange={handleShippingMethodChange}
            checked={selectedShippingMethod === "economical"}
          />
          <label htmlFor="economical-shipping" className="text-sm text-gray-700">Giao hàng tiết kiệm {FormatVND(serviceFee * 0.8)}</label>
        </div>
      </div>
        <div className="text-sm text-gray-500">
          {selectedShippingMethod === "economical"? <p>Giao hàng tiết kiệm có thể mất thêm thời gian.</p> : null}
          <p>Thời gian dự kiến giao hàng: {estimatedDeliveryDate}</p>
        </div>
      <Button className="w-full">Xác nhận</Button>
    </section>
  );
}
