"user client"
import { MapPin} from 'lucide-react'
import { Button } from "../../components/ui/button"
export default function ShippingAddressSection({ selectedAddress, setIsAddressDialogOpen, setIsNewAddressDialogOpen }) {

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold">Địa Chỉ Nhận Hàng</h2>
      </div>
      {selectedAddress ? (
        <div className="mb-4">
          <p className="font-semibold">{selectedAddress.fullName}</p>
          <p>{selectedAddress.address}</p>
          <p>Phone: {selectedAddress.phoneNumber}</p>
        </div>
      ) : (
        <p className="mb-4">No address selected</p>
      )}
      <div className="flex space-x-4">
        <Button variant="outline" size="sm" onClick={() => setIsAddressDialogOpen(true)}>Thay Đổi</Button>
        <Button variant="outline" size="sm" onClick={() => setIsNewAddressDialogOpen(true)}>Thêm địa chỉ mới</Button>
      </div>
    </section>
  )
}