"user client"
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import {Trash2 } from 'lucide-react'
export default function AddressSelectionDialog({ isOpen, setIsOpen, addresses, selectedAddress, setSelectedAddress, removeAddress, handleDeleteAddress}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn Địa Chỉ Giao Hàng</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.addressId}
              className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer ${
                selectedAddress?.id === address.addressId ? 'border-orange-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div>
                <p className="font-semibold">{address.fullName}</p>
                <p>{address.address}</p>
                <p>Phone: {address.phoneNumber}</p>
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); // Ngăn chặn sự kiện click từ button lan ra div
                  handleDeleteAddress(address.addressId); // Sử dụng id của address để xóa
                }} 
                className="text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsOpen(false)}>Xác nhận</Button>
      </DialogContent>
    </Dialog>
  );
}