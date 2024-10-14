'use client';
import React, { useState, useEffect } from 'react'
import { Upload, Eye, Edit, Trash2, Info } from 'lucide-react';

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent } from "../../components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { Switch } from "../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {useStore} from "../../context/StoreContext"
import sellerAPI from '../../api/seller';
import Menu from "./menu"
export default function ProductAdditionComponent() {
  const {storeId} = useStore();
  const [categories, setCategories] = useState([])
  const [mainImage, setMainImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [category, setCategory] = useState('')
  const [activateVariants, setActivateVariants] = useState(false)
  const [variantOptions, setVariantOptions] = useState([])
  const [variantCombinations, setVariantCombinations] = useState([])
  const [newVariantOption, setNewVariantOption] = useState({ name: '', value: '' })
  const [variantImages, setVariantImages] = useState([])
  const [showVariantForm, setShowVariantForm] = useState(false)
  const [editingVariantIndex, setEditingVariantIndex] = useState(null)
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)

  const [images, setImages] = useState([])
  const variantSuggestions = [
    "Màu sắc",
    "Kích cỡ",
    "Chất liệu",
    "Chất lượng",
    "Hãng sản xuất",
    "Kiểu dáng",
    "Loại sản phẩm",
    "Đặc điểm",
    "Tính năng",
    "Phong cách",
    "Mẫu mã",
    "Hình dạng",
    "Thương hiệu",
    "Công dụng",
    "Đối tượng sử dụng"
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const productFrom = () => {
    const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', productDescription);
        formData.append('categoryId', category);
        formData.append('price', price);
        formData.append('storeId', storeId);
        
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
    return formData;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await sellerAPI.category.getAllCategories();
      if (res.statusCode === 200) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  },[])

  useEffect(() => {
    if (activateVariants) {
      generateVariantCombinations()
    }
  }, [variantOptions, activateVariants])

  const generateVariantCombinations = () => {
    const combinations = []
    const generateCombination = (current, depth) => {
      if (depth === variantOptions.length) {
        combinations.push({ ...current, price: '', quantity: '', sku: '' })
        return
      }
      const currentOption = variantOptions[depth]
      for (const value of currentOption.values) {
        generateCombination({ ...current, [currentOption.name]: value }, depth + 1)
      }
    }
    generateCombination({}, 0)
    setVariantCombinations(combinations)
  }

  const handleImageUpload = (event, index) => {
    const file = event.target.files?.[0]

    if (file) {

      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const reader = new FileReader()
      reader.onloadend = () => {
        if (index === 0) {
          setMainImage(reader.result)
        } else {
          const newAdditionalImages = [...additionalImages]
          newAdditionalImages[index - 1] = reader.result
          setAdditionalImages(newAdditionalImages)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = (index) => {
    if (index === 0) {
      setMainImage(null)
    } else {
      const newAdditionalImages = [...additionalImages]
      newAdditionalImages[index - 1] = null
      setAdditionalImages(newAdditionalImages)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewVariantOption({ ...newVariantOption, name: value });

    // Lọc danh sách gợi ý
    if (value) {
      const filtered = variantSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleVariantImage = (e, variantName) => {
    const file = e.target.files?.[0]
    
    if (file) {
      
      setNewVariantOption({...newVariantOption, image: file})
      const reader = new FileReader()
      reader.onloadend = () => {
       if(variantOptions.length === 0) {
        setVariantImages([reader.result])
        console.log("variant image new: ")
       }else{
        variantOptions.map((variant, index) => {
          if(variant.name === variantName) {
            const newVariantImages = [...variantImages]
            newVariantImages[index] = reader.result
            setVariantImages(newVariantImages)
            console.log("variant image index: "+ index)
          }
        })
       }
       

      }
      reader.readAsDataURL(file)
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewVariantOption({ ...newVariantOption, name: suggestion });
    setFilteredSuggestions([]); 
  };

  const handleAddVariantOption = () => {
    if (newVariantOption.name && newVariantOption.value) {
      const existingVariantIndex = variantOptions.findIndex(v => v.name === newVariantOption.name)
      if (existingVariantIndex !== -1) {
        setShowDuplicateWarning(true)
        setEditingVariantIndex(existingVariantIndex)
        setVariantOptions(prev => prev.map((opt, index) => 
          index === existingVariantIndex
            ? { ...opt, values: [...opt.values, newVariantOption.value] }
            : opt))
      } else {
        setVariantOptions(
          prev => [...prev, { name: newVariantOption.name, values: [newVariantOption.value] }]
        )
      }
      setNewVariantOption({ name: '', value: '' })
      setShowVariantForm(false)
      setEditingVariantIndex(null)
    }
  }

  const handleVariantCombinationChange = (index, field, value) => {
    const updatedCombinations = [...variantCombinations]
    updatedCombinations[index][field] = value
    setVariantCombinations(updatedCombinations)
  }

  const handleDeleteVariantCombination = (index) => {
    setVariantCombinations(prev => prev.filter((_, i) => i !== index))
  }

  const handleEditVariant = (index) => {
    setEditingVariantIndex(index)
    setNewVariantOption({ name: variantOptions[index].name, value: '' })
    setShowVariantForm(true)
    setShowDuplicateWarning(false)
  }

  const handleDeleteVariant = (index) => {
    setVariantOptions(prev => prev.filter((_, i) => i !== index))
    setEditingVariantIndex(null)
    setShowVariantForm(false)
    setShowDuplicateWarning(false)
  }

  const handleVariantFormSubmit = () => {
    if (editingVariantIndex !== null) {
      setVariantOptions(prev => prev.map((opt, index) => 
        index === editingVariantIndex
          ? { ...opt, values: [...opt.values, newVariantOption.value] }
          : opt))
    } else {
      setVariantOptions(
        prev => [...prev, { name: newVariantOption.name, values: [newVariantOption.value] }]
      )
    }
    setNewVariantOption({ name: '', value: '' })
    setShowVariantForm(false)
    setEditingVariantIndex(null)
    setShowDuplicateWarning(false)
  }

  const showData = () => {
    console.log("Product Name: ", productName)
    console.log("Product Description: ", productDescription)
    console.log("Category: ", category)
    // console.log("Price: ", price)
    console.log("Store ID: ", storeId)
    console.log("Images: ", images)
    console.log("Variant Options: ", variantOptions)
    console.log("Variant Combinations: ", variantCombinations)
  }

  return (
    (<div className="min-h-screen bg-gray-100 p-4">
      <Menu/>
      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Thông tin cơ bản</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <main className="flex-1">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h2 className="text-lg font-semibold text-red-500 mr-1">Hình ảnh sản phẩm</h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thông tin về hình ảnh sản phẩm</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-500 mb-4">Bạn nên thêm ít nhất 5 hình ảnh để minh họa đầy đủ cho sản phẩm của bạn. Ví dụ</p>
                
                {/* Image Upload Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Main Image */}
                  <div
                    className="col-span-2 row-span-2 relative border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => handleImageUpload(e, 0)} />
                    {mainImage ? (
                      <div className="relative w-full h-full">
                        <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                          Hình ảnh chính
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button size="icon" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="secondary">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="secondary" onClick={() => handleDeleteImage(0)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Tải ảnh lên</p>
                      </div>
                    )}
                  </div>

                  {/* Additional Images */}
                  {['Tải ảnh lên', 'Cạnh bên', 'Các góc độ khác', 'Đang sử dụng', 'Biến thể', 'Phối cảnh nền', 'Ảnh chụp cận'].map((label, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleImageUpload(e, index + 1)} />
                      {additionalImages[index] ? (
                        <div className="relative w-full h-full">
                          <img
                            src={additionalImages[index]}
                            alt={label}
                            className="w-full h-full object-cover rounded" />
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-1 right-1"
                            onClick={() => handleDeleteImage(index + 1)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">{label}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  - Kích thước: 300 x 300 px<br />
                  - Kích thước tập tin tối đa: 5 MB<br />
                  - (Tối đa 9 tập tin)<br />
                  - Định dạng: JPG, JPEG, PNG
                </p>
              </div>

              {/* Product Name Input */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h2 className="text-lg font-semibold text-red-500 mr-1">Tên sản phẩm</h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thông tin về tên sản phẩm</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-500 mb-2">Độ dài đề xuất: 40 ký tự trở lên. Danh mục sẽ được tự động xác định theo tên sản phẩm.</p>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength={255}
                  placeholder="[Thương hiệu] + [Nội dung] + [Phạm vi áp dụng] + [Loại sản phẩm] + [Chức năng / Tính năng chính]"
                  className="w-full" />
                <p className="text-sm text-gray-500 mt-1 text-right">
                  {productName.length}/255
                </p>
              </div>

              {/* Category Select */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h2 className="text-lg font-semibold text-red-500 mr-1">Hạng mục</h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thông tin về hạng mục sản phẩm</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn hạng mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                    categories.map((category, index) => {
                      return (
                        <SelectItem key={index} value={category.categoryId}>
                          {category.categoryName}
                        </SelectItem>
                      )
                    })
                  }
                  </SelectContent>
                  
                </Select>
              </div>

              {/* Product  Description Textarea */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Chi tiết Sản phẩm</h2>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-red-500 mr-1">Mô tả sản phẩm</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thông tin về mô tả sản phẩm</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-500 mb-2">Nên viết mô tả dài ít nhất 500 ký tự và thêm hình ảnh để giúp khách hàng đưa ra quyết định mua hàng.</p>
                <Textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Nhập mô tả sản phẩm chi tiết ở đây..."
                  className="w-full h-40" />
                <p className="text-sm text-gray-500 mt-1 text-right">
                  {productDescription.length} ký tự
                </p>
              </div>

              {/* Variant Management */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Thông tin Biến thể</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold mr-2">Kích hoạt biến thể</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bạn có thể thêm biến thể nếu sản phẩm này có nhiều lựa chọn như kích cỡ hoặc màu sắc.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch checked={activateVariants} onCheckedChange={setActivateVariants} />
                </div>
                {activateVariants && (
                  <>
                    {showDuplicateWarning && (
                      <Alert className="mb-4">
                        <AlertTitle>Cảnh báo</AlertTitle>
                        <AlertDescription>
                          Biến thể đã được tạo. Vui lòng chọn một biến thể khác.
                        </AlertDescription>
                      </Alert>
                    )}
                    {variantOptions.map((variant, variantIndex) => (
                      <div key={variantIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{variant.name}</h4>
                          <div>
                            <Button variant="ghost" size="sm" onClick={() => handleEditVariant(variantIndex)}>
                              <Edit className="w-4 h-4 mr-2" /> Sửa 
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteVariant(variantIndex)}>
                              <Trash2 className="w-4 h-4 mr-2" /> Xóa
                            </Button>
                          </div>
                        </div>
                        {variant.values.map((value, valueIndex) => (
                          <p 
                            key={valueIndex} 
                            className="inline-block mr-2 px-2 py-1 border border-gray-300 rounded-full text-sm font-medium"
                          >
                            {value}
                          </p>
                        ))}

                      </div>
                    ))}
                    {showVariantForm ? (
                      <div className="border border-gray-200 rounded-lg p-4 flex">
                        {/* Phần Hình Ảnh */}
                        {/* <div className="relative border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center mr-5">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh biến thể</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleVariantImage(e, newVariantOption.name)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>   */}

                        {/* Phần Nhập Thông Tin Biến Thể */}
                        <div className="flex-grow">
                          <div className="mb-4">
                            <label
                              htmlFor="variantName"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Tên biến thể
                            </label>
                            <Input
                              type="text"
                              value={newVariantOption.name}
                              onChange={handleInputChange}
                              placeholder="Chọn hoặc nhập một biến thể"
                              className="w-full"
                            />
                            {filteredSuggestions.length > 0 && (
                              <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full">
                                {filteredSuggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="variantValue"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Giá trị biến thể
                            </label>
                            <Input
                              id="variantValue"
                              value={newVariantOption.value}
                              onChange={(e) => setNewVariantOption({ ...newVariantOption, value: e.target.value })}
                              placeholder="Nhập giá trị biến thể"
                              className="w-full"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button onClick={handleVariantFormSubmit}>
                              {editingVariantIndex !== null ? 'Cập nhật' : 'Thêm'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowVariantForm(true)}
                      >
                        + Thêm biến thể
                      </Button>
                    )}

                    {variantCombinations.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 mb-5">
                        {variantCombinations.map((combination, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3 flex flex-col items-center">
                            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                              {/* Hình ảnh biến thể */}
                              <img 
                                src={combination.imageUrl || '/placeholder.png'} 
                                alt={`Hình ảnh biến thể ${index + 1}`} 
                                className="object-cover w-full h-full" 
                              />
                            </div>
                            <div className="text-center mb-2">
                              {variantOptions.map((option, optionIndex) => (
                                <span 
                                  key={optionIndex} 
                                  className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-medium border border-gray-300 mr-1"
                                >
                                  {combination[option.name]}
                                </span>
                              ))}
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleImageChange(e, index)} 
                              className="hidden" 
                              id={`variantImage-${index}`}
                            />
                            <label 
                              htmlFor={`variantImage-${index}`} 
                              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-2 py-1 text-sm font-medium border border-gray-300 mt-2"
                            >
                              Chọn hình ảnh
                            </label>
                          </div>
                        ))}
                      </div>
                    )}


                                        <div className="mt-4">
                                          <h4 className="text-lg font-semibold mb-2">Danh sách Biến thể</h4>
                                          <Table>
                                            <TableHeader>
                                              {variantOptions.map((option, index) => (
                                                <TableHead key={index}>{option.name}</TableHead>
                                              ))}
                                              <TableHead>Giá bán lẻ</TableHead>
                                              <TableHead>Số lượng</TableHead>
                                              <TableHead>SKU Người bán</TableHead>
                                              <TableHead></TableHead>
                                            </TableHeader>
                                            <TableBody>
                                              {variantCombinations.map((combination, index) => (
                                                <TableRow key={index}>
                                                  {variantOptions.map((option, optionIndex) => (
                                                    <TableCell key={optionIndex}>{combination[option.name]}</TableCell>
                                                  ))}
                              <TableCell>
                                <Input
                                  type="number"
                                  value={combination.price}
                                  onChange={(e) =>  (index, 'price', e.target.value)}
                                  placeholder="Giá" />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  value={combination.quantity}
                                  onChange={(e) => handleVariantCombinationChange(index, 'quantity', e.target.value)}
                                  placeholder="Số lượng" />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={combination.sku}
                                  onChange={(e) => handleVariantCombinationChange(index, 'sku', e.target.value)}
                                  placeholder="SKU" />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteVariantCombination(index)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </CardContent>
      </Card>
              <button onClick={showData}>Get data</button>
    </div>)
  );
}