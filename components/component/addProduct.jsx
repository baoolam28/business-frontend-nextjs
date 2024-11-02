import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../../components/ui/select";
import AddSupplierDialog from "../../components/component/addSupplier";
import AddCategoryDialog from "../../components/component/addCategory";
import AddOriginDialog from "../../components/component/addOrigin";
import supplierAPI from "../../api/supplier";
import originAPI from "../../api/origin";
import categoryAPI from "../../api/category";
import generateBarcode from "../../utils/GenerationBarcode";
import sellerAPI from '../../api/seller';
import Image from "next/image"
import { useUser } from "../../context/UserContext";
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"
const AddProductDialog = ({ open, onClose, onSave, categories, suppliers, origins, setCategories, setSuppliers, setOrigins, storeId }) => {
  const {user} = useUser();
  const [productData, setProductData] = useState({
    barcode: '',
    images: [],
    productName: '',
    abbreviations: '',
    unit: '',
    price: '',
    categoryId: '',
    supplierId: '',
    originId: '',
    createBy: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const imageUrls = []; // Array to hold the data URLs
  
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imageUrls.push(reader.result); // Push each data URL to the array
          // Once all images are loaded, update the state
          if (imageUrls.length === filesArray.length) {
            setSelectedImages(imageUrls); // Update selected images with data URLs
            setProductData((prev) => ({ ...prev, images: filesArray })); // Update productData with files
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  

  useEffect(() => {
    if(user){
      setProductData(prev => ({ ...prev,createBy: user?.id})); 
    }
  },[user]);

  const handleGenerateBarcode = () => {
    const barcode = generateBarcode.generateEAN13();

    setProductData(prev => ({ ...prev, barcode }));
  };

  const handleChange = (name, value) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if(!validateProductData){
      showErrorAlert("Thêm sản phẩm mới","Vui lòng điền thông tin hợp lệ!");
      return
    }

    const reqData = convertToFormData(productData);
    const res = fetchCreateProduct(reqData);

    if(res){
      console.log("product response : " + JSON.stringify(res));
      showSuccessAlert("Thêm sản phẩm mới","Thêm sản phẩm thành công!");
    }

  };

  const validateProductData = () => {
    if (!productData.barcode) return false;
    if (productData.images.length === 0) return false;
    if (!productData.productName) return false;
    if (!productData.unit) return false;
    if (!productData.price || isNaN(productData.price) || productData.price <= 0) return false;
    if (!productData.categoryId) return false;
    if (!productData.supplierId) return false;
    if (!productData.originId) return false;
    if (!productData.createBy) return false;
    return true;
  };

  const convertToFormData = (data) => {
    const formData = new FormData();
    formData.append('barcode', data.barcode);
    data.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append('productName', data.productName);
    formData.append('abbreviations', data.abbreviations);
    formData.append('unit', data.unit);
    formData.append('price', data.price);
    formData.append('categoryId', data.categoryId);
    formData.append('supplierId', data.supplierId);
    formData.append('originId', data.originId);
    formData.append('createBy', data.createBy);

    return formData;
  };

  const fetchCreateProduct = async (data) => {
    try {
      const res = await sellerAPI.product.createProductOffline(data);
      return res;
    } catch (error) {
      return null;
    }
  };

  const handleSaveSupplier = async (supplierData) => {
    try {
      const response = await sellerAPI.supplier.createSupplier(supplierData);
      if(response.statusCode === 200){
        setSuppliers(prev => [...prev, response.data]);
      }
      
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
      <DialogContent className="fullscreen-dialog">
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
                <div>
                  <Label htmlFor="productImage">Hình ảnh sản phẩm</Label>
                  <Input
                    id="productImage"
                    name="productImage"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  {selectedImages.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Hình ảnh sản phẩm ${index + 1}`}
                          className="h-20 w-20 rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="categoryId">Loại hàng</Label>
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
                  <AddCategoryDialog onSave={(cat) => handleChange('categoryId', cat)} buttonText="" buttonIcon={PlusIcon} />
                </div>
                <div>
                  <Label htmlFor="supplierId">Nhà cung cấp</Label>
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
                  <AddSupplierDialog onSave={(sup) => handleChange('supplierId', sup)} buttonText="" buttonIcon={PlusIcon} storeId={storeId} />
                </div>
                <div>
                  <Label htmlFor="originId">Quốc Gia</Label>
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
                  <AddOriginDialog onSave={(ori) => handleChange('originId', ori)} buttonText="" buttonIcon={PlusIcon} />
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
