"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddCategoryDialog = ({ onSave, buttonText = "Thêm loại hàng", buttonIcon: ButtonIcon }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryData = {
      categoryName: event.target.categoryName.value,
      categoryDescription: event.target.categoryDescription.value,
    };
    console.log(categoryData);
    onSave(categoryData);
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
          <DialogTitle id="dialog-title">Thêm loại hàng hóa</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <p>Nhập loại hàng hóa mới</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Tên loại hàng hóa
              </Label>
              <Input id="categoryName" name="categoryName" placeholder="Nhập loại hàng hóa" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryDescription" className="text-right">
                Mô tả cho loại hàng
              </Label>
              <Input id="categoryDescription" name="categoryDescription" type="categoryDescription" placeholder="Nhập mô tả..." className="col-span-3" required />
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

export default AddCategoryDialog;