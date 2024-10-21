"user client"
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from "../../components/ui/dialog"
import { useState} from 'react'
import SelectAddress from "./SelectAddress"
import {showSuccessAlert, showErrorAlert} from "../../utils/reactSweetAlert"
export default function NewAddressDialog({ isOpen, setIsOpen, onNewAddress}) {
  
  const handleSaveAddress = (data) => {
    if(data){
      setIsOpen(false)
      onNewAddress(data)
      showSuccessAlert("Thêm địa chỉ mới","thêm địa chỉ mới thành công!")
    }else{
      showErrorAlert("Thêm địa chỉ mới","Đã có lỗi xảy ra!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Địa Chỉ Mới</DialogTitle>
        </DialogHeader>
        <SelectAddress onSaveAddress={handleSaveAddress}/>
      </DialogContent>
    </Dialog>
  );
  
}

