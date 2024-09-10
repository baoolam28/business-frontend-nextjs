"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddSupplierDialog = ({ onSave, buttonText = "Thêm nhà cung cấp", buttonIcon: ButtonIcon }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const supplierData = {
      supplierName: event.target.supplierName.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      fax: event.target.fax.value,
      address: event.target.address.value,
    };
    onSave(supplierData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {ButtonIcon && <ButtonIcon className="mr-2" />} {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle id="dialog-title">Thêm nhà cung cấp</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <p>Nhập thông tin của nhà cung cấp trong mẫu dưới đây.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplierName" className="text-right">
                Tên nhà cung cấp
              </Label>
              <Input id="supplierName" name="supplierName" placeholder="Nhập tên nhà cung cấp" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" type="email" placeholder="supplier@example.com" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fax" className="text-right">
                Số Fax
              </Label>
              <Input id="fax" name="fax" type="tel" placeholder="(123) 456-7890" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Địa chỉ
              </Label>
              <Textarea id="address" name="address" placeholder="Nhập địa chỉ..." className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Lưu thông tin</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;
