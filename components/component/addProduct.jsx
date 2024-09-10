import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import AddSupplierDialog from "../../components/component/addSupplier";
import AddCategoryDialog from "../../components/component/addCategory";
import AddOriginDialog from "../../components/component/addOrigin";
import supplierAPI from "../../api/supplier";
import originAPI from "../../api/origin";
import categoryAPI from "../../api/category";
import generateBarcode from "../../utils/GenerationBarcode";
import BarcodeRender from "./barcodeRender";
const AddProductDialog = ({ open, onClose, onSave, categories, suppliers, origins, setCategories, setSuppliers, setOrigins }) => {
  const [productData, setProductData] = useState({
    barcode: '',
    productName: '',
    abbreviations: '',
    unit: '',
    price: '',
    categoryId: '',
    supplierId: '',
    originId: '',
    createBy: '',
  });


  const handleGenerateBarcode = () => {
    const barcode = generateBarcode.generateEAN13();

    setProductData(prev => ({ ...prev, barcode }));
  };

  const handleChange = (name, value) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productData);
    onClose();
  };

  const handleSaveSupplier = async (supplierData) => {
    try {
      const response = await supplierAPI.createSupplier(supplierData);
      setSuppliers(prev => [...prev, response]);
    } catch (error) {
      console.error("createSupplier failed", error);
    }
  }

  const handleSaveCategory = async (categoryData) => {
    try {
      const response = await categoryAPI.createCategory(categoryData);
      setCategories(prev => [...prev, response]);
    } catch (error) {
      console.error("createCategory failed", error);
    }
  }

  const handleSaveOrigin = async (originData) => {
    try {
      const response = await originAPI.createOrigin(originData);
      setOrigins(prev => [...prev, response]);
    } catch (error) {
      console.error("createOrigin failed", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-4xl mx-auto p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="barcode">Mã Barcode</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="barcode"
                      name="barcode"
                      type="text"
                      placeholder="Scan or enter barcode"
                      value={productData.barcode}
                      onChange={(e) => handleChange('barcode', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                      required
                    />
                    <Button variant="outline" size="icon" onClick={handleGenerateBarcode}>
                      <BarcodeIcon className="h-5 w-5" />
                      <span className="sr-only">Generate Barcode</span>
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="productName">Tên sản phẩm</Label>
                  <Input
                    id="productName"
                    name="productName"
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={productData.productName}
                    onChange={(e) => handleChange('productName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="abbreviations">Tên viết tắt</Label>
                  <Input
                    id="abbreviations"
                    name="abbreviations"
                    type="text"
                    placeholder="Nhập tên viết tắt"
                    value={productData.abbreviations}
                    onChange={(e) => handleChange('abbreviations', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Đơn vị</Label>
                  <Input
                    id="unit"
                    name="unit"
                    type="text"
                    placeholder="Nhập đơn vị sản phẩm"
                    value={productData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Giá bán</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Nhập giá bán"
                    value={productData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="categoryId">Loại hàng</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      id="categoryId"
                      name="categoryId"
                      value={productData.categoryId}
                      onValueChange={(value) => handleChange('categoryId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại hàng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem key={category.categoryId} value={category.categoryId}>
                              {category.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <AddCategoryDialog
                      onSave={handleSaveCategory}
                      buttonText=""
                      buttonIcon={PlusIcon}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="supplierId">Nhà cung cấp</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      id="supplierId"
                      name="supplierId"
                      value={productData.supplierId}
                      onValueChange={(value) => handleChange('supplierId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhà cung cấp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.supplierId} value={supplier.supplierId}>
                              {supplier.supplierName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <AddSupplierDialog
                      onSave={handleSaveSupplier}
                      buttonText=""
                      buttonIcon={PlusIcon}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="originId">Quốc Gia</Label>
                  <div className="flex items-center gap-2">
                    <Select
                      id="originId"
                      name="originId"
                      value={productData.originId}
                      onValueChange={(value) => handleChange('originId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quốc gia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {origins.map((origin) => (
                            <SelectItem key={origin.originId} value={origin.originId}>
                              {origin.originName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <AddOriginDialog
                      onSave={handleSaveOrigin}
                      buttonText=""
                      buttonIcon={PlusIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end mt-6">
              <DialogClose>
                <Button variant="outline" className="mr-2">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Product</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

function BarcodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5v14" />
      <path d="M8 5v14" />
      <path d="M12 5v14" />
      <path d="M17 5v14" />
      <path d="M21 5v14" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default AddProductDialog;
