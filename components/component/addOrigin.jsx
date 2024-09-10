"use client";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddOriginDialog = ({ onSave, buttonText = "Thêm quốc gia", buttonIcon: ButtonIcon }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const originData = {
      originId: event.target.originId.value,
      originName: event.target.originName.value,
    };
    onSave(originData);
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
          <DialogTitle id="dialog-title">Thêm Quốc Gia</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originId" className="text-right">
                Mã quốc gia
              </Label>
              <Input id="originId" name="originId" placeholder="Nhập mã quốc gia" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originName" className="text-right">
                Tên quốc gia
              </Label>
              <Input id="originName" name="originName" type="originName" placeholder="Nhập tên quốc gia" className="col-span-3" required />
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

export default AddOriginDialog;