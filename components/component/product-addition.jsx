'use client';
import React, { useState, useEffect } from 'react'
import { Upload, Eye, Edit, Trash2, Info, InfoIcon } from 'lucide-react';
import { ChevronLeft, HelpCircle, Save, Send } from 'lucide-react'
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
import { Label } from "../../components/ui/label"
import Menu from "./menu"
import SellerAPI from "../../api/seller"
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"
import Loading from "../../components/component/loading-lottie"
import Animation from "../../utils/lottie-animations/rocket.json"
export default function ProductAdditionComponent() {
  const [loading, setLoading] = useState(true)
  const {storeId} = useStore();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState([])
  const [mainImage, setMainImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [category, setCategory] = useState('')
  const [saleInformation, setSaleInformation] = useState({price: 0, quantity: 0, sku: ''})
  const [activateVariants, setActivateVariants] = useState(false)
  const [variantOptions, setVariantOptions] = useState([])
  const [variantCombinations, setVariantCombinations] = useState([])
  const [newVariantOption, setNewVariantOption] = useState({ name: '', value: '' })
  const [variantImages, setVariantImages] = useState([])
  const [showVariantForm, setShowVariantForm] = useState(false)
  const [editingVariantIndex, setEditingVariantIndex] = useState(null)
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ height: '', width: '', length: '' });
  const [errors, setErrors] = useState({ weight: '', height: '', width: '', length: '' });
  const [messageError, setMessageError] = useState('');
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

  useEffect(() => {
    setMounted(true);
  }, []);

  
  useEffect(() => {
  if (variantCombinations.length > 0) {
    const { price, quantity, sku } = variantCombinations[0]; 
    setSaleInformation({ price, quantity, sku }); 
  }
}, [variantCombinations]);
  

  useEffect(() => {

    const fetchCategories = async () => {
      const res = await sellerAPI.category.getAllCategories();
      if (res.statusCode === 200) {
        setCategories(res.data);
        setLoading(false);
      }
    };
    fetchCategories();
  },[])

  useEffect(() => {
    if (activateVariants) {
      generateVariantCombinations()
    }else{
      setVariantCombinations([])
      setSaleInformation({price: 0, quantity: 0, sku: ''})
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
      for (const attribute of currentOption.attributes) {
        const [name, value] = Object.entries(attribute)[0] // Lấy tên và giá trị từ attributes
        generateCombination({ ...current, [name]: value }, depth + 1)
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

  const handleNotVariantCombinationChange = (field, value) => {
      if (!activateVariants) {
          setVariantCombinations((prev) => {
              // Giả sử bạn muốn cập nhật đối tượng đầu tiên trong mảng
              const updatedCombinations = [...prev];
              updatedCombinations[0] = {
                  ...updatedCombinations[0],
                  [field]: value,
              };
              return updatedCombinations;
          });
      }
  };


  const handleDeleteVariantCombination = (index) => {
    setVariantCombinations(prev => prev.filter((_, i) => i !== index))
  }

  const handleEditVariant = (index) => {
  setEditingVariantIndex(index)
  
  // Giả sử chỉ sửa giá trị của thuộc tính đầu tiên trong mảng attributes
  const firstAttribute = variantOptions[index].attributes[0] || {}
  const attributeName = Object.keys(firstAttribute)[0] || ''
  const attributeValue = firstAttribute[attributeName] || ''

  setNewVariantOption({ name: attributeName, value: attributeValue })
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
    setVariantOptions(prev => 
      prev.map((opt, index) => {
        if (index === editingVariantIndex) {
          const updatedAttributes = opt.attributes.map(attribute => {
            const attributeName = Object.keys(attribute)[0];
            const attributeValue = attribute[attributeName];

            // If the new name matches the existing name but with a different value
            if (newVariantOption.name === attributeName && newVariantOption.value !== attributeValue) {
              return { ...attribute, [attributeName]: newVariantOption.value };
            }

            // If both the name and value are the same as existing
            if (newVariantOption.name === attributeName && newVariantOption.value === attributeValue) {
              return attribute;
            }

            // If the new name is different from the existing name
            if (newVariantOption.name !== attributeName) {
              return { [newVariantOption.name]: newVariantOption.value };
            }

            return attribute;
          });

          // Add new attribute if it doesn't exist in updatedAttributes
          if (!updatedAttributes.some(attr => Object.keys(attr)[0] === newVariantOption.name)) {
            updatedAttributes.push({ [newVariantOption.name]: newVariantOption.value });
          }

          return { ...opt, attributes: updatedAttributes };
        }
        return opt;
      })
    );
  } else {
    // Check if a variant with the same name already exists
    setVariantOptions(prev => {
      const existingVariantIndex = prev.findIndex(opt => 
        opt.attributes.some(attribute => Object.keys(attribute)[0] === newVariantOption.name)
      );

      if (existingVariantIndex !== -1) {
        // Update the existing variant's attributes if name matches
        return prev.map((opt, index) => {
          if (index === existingVariantIndex) {
            const updatedAttributes = [
              ...opt.attributes,
              { [newVariantOption.name]: newVariantOption.value }
            ];
            return { ...opt, attributes: updatedAttributes };
          }
          return opt;
        });
      } else {
        // Add a new variant entry if name doesn't exist
        return [
          ...prev, 
          { 
            attributes: [
              { [newVariantOption.name]: newVariantOption.value }
            ]
          }
        ];
      }
    });
  }

  setNewVariantOption({ name: '', value: '' });
  setShowVariantForm(false);
  setEditingVariantIndex(null);
  setShowDuplicateWarning(false);
};



  const handleImageChange = (e, indexImage) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;

        // Cập nhật state của variantCombinations sau khi có imageUrl
        setVariantCombinations(prevCombinations =>
          prevCombinations.map((combination, index) =>
            index === indexImage
              ? { ...combination, imageUrl, image: file }
              : combination
          )
        );
      };
      reader.readAsDataURL(file); // Đọc file để lấy URL
    }
  };


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

  const validateAndRoundNumber = (value) => {
    let num = parseFloat(value);
    if (num < 0) return 1; // Nếu nhỏ hơn 0, trả về 1
    return Math.round(num); // Làm tròn đến số nguyên gần nhất
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    const roundedValue = validateAndRoundNumber(value);
    setWeight(roundedValue);
    setErrors({ ...errors, weight: roundedValue > 0 ? '' : 'Trọng lượng phải lớn hơn 0' });
  };

  const handleDimensionChange = (e, dimension) => {
    const value = e.target.value;
    const roundedValue = validateAndRoundNumber(value);
    setDimensions({ ...dimensions, [dimension]: roundedValue });
    setErrors({
      ...errors,
      [dimension]: roundedValue > 0 ? '' : 'Kích thước phải lớn hơn 0',
    });
  };

  const handleSaveProduct = () => {
    if(validateData()){
      const productData = productFrom();
      fetchCreateProductOnline(productData);
      showSuccessAlert("Thêm sản phẩm mới","gửi thành công đang chờ xét duyệt!")

    }else{
      showErrorAlert("Thêm sản phẩm mới",`${messageError}`);
      return;
    }
  }

  const productFrom = () => {
    const formData = new FormData();

    // Thêm các thông tin cơ bản của sản phẩm
    formData.append('productName', productName);
    formData.append('description', productDescription);
    formData.append('categoryId', category);
    formData.append('price', saleInformation.price); // Sử dụng giá từ saleInformation
    formData.append('storeId', storeId);
    
    // Thêm hình ảnh vào FormData
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }

    const productDetail = [];

    // Duyệt qua các biến thể để xây dựng productDetail
    for (let detail of variantCombinations) {
        const width = dimensions?.width || 1;
        const height = dimensions?.height || 1;
        const length = dimensions?.length || 1;
        const price = detail?.price || saleInformation.price; // Lấy giá từ saleInformation nếu không có
        const sku = detail?.sku || '';
        const quantity = detail?.quantity || 0;
        const image = detail?.image || ''; // Sử dụng URL hình ảnh nếu có

        const attributes = new Map();

        // Duyệt qua các tùy chọn biến thể để thiết lập thuộc tính
        variantOptions.forEach(variant => {
            if (variant) {
                variant.attributes.forEach(attribute => {
                    const [key, value] = Object.entries(attribute)[0];
                    const options = Object.values(detail);

                    if (options.includes(value)) {
                        attributes.set(key, value);
                    }
                });
            }
        });

        // Chuyển đổi Map thành một đối tượng
        const attributesObject = Object.fromEntries(attributes);
        
        // Thêm thông tin chi tiết sản phẩm vào mảng productDetail
        productDetail.push({
            width,
            height,
            length,
            price,
            sku,
            quantity,
            image,
            attributes: attributesObject,
        });
    }

    // Thêm thông tin chi tiết sản phẩm vào formData
    productDetail.forEach((detail, index) => {
        formData.append(`productDetail[${index}].width`, detail.width);
        formData.append(`productDetail[${index}].height`, detail.height);
        formData.append(`productDetail[${index}].length`, detail.length);
        formData.append(`productDetail[${index}].weight`, weight);
        formData.append(`productDetail[${index}].price`, detail.price);
        formData.append(`productDetail[${index}].sku`, detail.sku);
        formData.append(`productDetail[${index}].quantity`, detail.quantity);
        
        if (detail.image) {
            formData.append(`productDetail[${index}].image`, detail.image); // Xử lý file hình ảnh
        }

        // Thêm thuộc tính
        Object.entries(detail.attributes).forEach(([key, value]) => {
            formData.append(`productDetail[${index}].attributes[${key}]`, value);
        });
    });

    return formData; // Trả về formData đã hoàn thành
};





  const validateData = () => {

    if(!productName){
      setMessageError('Tên sản phẩm không được để trống');
      return false;
    }

    if(!productDescription){
      setMessageError('Mô tả sản phẩm không được để trống');
      return false;
    }

    if(!category){
      setMessageError('Chọn danh mục sản phẩm');
      return false;
    }

    // Kiểm tra trường price trong saleInformation
    if (saleInformation.price <= 0) {
        setMessageError('Giá sản phẩm phải lớn hơn 0');
        return false;
    }

    // Kiểm tra trường quantity trong saleInformation
    if (saleInformation.quantity <= 0) {
        setMessageError('Số lượng sản phẩm phải lớn hơn 0');
        return false;
    }

    // Kiểm tra trường sku trong saleInformation
    if (!saleInformation.sku) {
        setMessageError('SKU không được để trống');
        return false;
    }

    if(!storeId){
      setMessageError('Bạn chưa đăng nhập');
      return false;
    }

    if(images.length < 1){
      setMessageError('Chưa chọn ảnh cho sản phẩm');
      return false;
    }

    for (let key in dimensions) {
      if (dimensions[key] === '') {
        setMessageError('Vui lòng nhập kích thước');
        return false;
      }
    } 

    if(!weight){
      setMessageError('Trọng lượng sản phẩm không được để trống');
      return false;
    }

    if(variantCombinations.length < 1){
      setMessageError('Vui lòng thêm nhập thông tin bán hàng cho sản phẩm');
      return false;
    }
  
    return true;
  };

  const fetchCreateProductOnline = async (data) => {
    try {
      setLoading(true); // Start loading
      const response = await SellerAPI.product.createProductOnline(data);
      // Check response status
      if (response.statusCode === 200) {
        showSuccessAlert("Thêm sản phẩm mới", "Gửi thành công, đang chờ xét duyệt!");
      } else {
        showErrorAlert("Thêm sản phẩm mới", "Đã xảy ra lỗi khi tạo sản phẩm.");
      }
    } catch (error) {
      console.log("Failed to fetch create product online", error);
      showErrorAlert("Thêm sản phẩm mới", "Đã xảy ra lỗi khi gửi yêu cầu.");
    } finally {
      setLoading(false); 
    }
  };

  if (!mounted) {
    // Tránh render nội dung trước khi component đã mounted
    return null;
  }

  if(loading){
    return <Loading animation={Animation}/>;
  }

  return (
    (<div className="min-h-screen bg-gray-100 p-4">
      <Menu/>
      <div className="header fixed top-0 left-14 right-0 bg-white shadow transition-all duration-300 ease-in-out z-10" id="header">
        <div className="flex items-center justify-between p-4">
          <a href="#" className="text-gray-600 text-sm flex items-center hover:text-blue-500 transition">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quản lý Sản phẩm
          </a>
          <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm mới</h1>
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="outline" size="icon" className="hover:bg-gray-200 transition">
              <HelpCircle className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600 transition">
              <Save className="mr-2 h-4 w-4" />
              Lưu làm nháp
            </Button>
            <Button 
            onClick={handleSaveProduct}
            className="bg-green-500 text-white hover:bg-green-600 transition">
              Gửi để xét duyệt
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Card className="max-w-6xl mx-auto ">
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
                      onChange={(e) => handleImageUpload(e, 0)} 
                      required
                    />
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
                  required
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
                <Select value={category} onValueChange={setCategory} required>
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
                <h2 className="text-2xl font-bold mb-4">Thông tin bán hàng</h2>
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
                        {variant.attributes.map((attribute, valueIndex) => (
                          <p 
                            key={valueIndex} 
                            className="inline-block mr-2 px-2 py-1 border border-gray-300 rounded-full text-sm font-medium"
                          >
                            {Object.keys(attribute)[0]}: {Object.values(attribute)[0]}
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
                              {variantOptions.map((variant, variantIndex) => {
                                if (variant) {
                                  return variant.attributes.map((attribute, attributeIndex) => {
                                    const [key, value] = Object.entries(attribute)[0]; // Get the first entry
                                    const options = Object.values(combination);
                                    
                                    if (options.includes(value)) {
                                      return (
                                        <span 
                                          key={attributeIndex} 
                                          className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-medium border border-gray-300 mr-1"
                                        >
                                          {value}
                                        </span>
                                      );
                                    }
                                    return null; // Explicitly return null if key is not found
                                  });
                                }
                                return null; // Return null if variant is falsy
                              })}
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
                      <Table className="min-w-full border-collapse">
                        <TableHeader>
                          <TableRow className="bg-gray-200">
                            {variantOptions.map((variant, variantIndex) => {
                              if (variant) {
                                const attribute = variant.attributes[0];
                                const [key, value] = Object.entries(attribute)[0];
                                return (
                                  <TableHead className="px-4 py-2 border" key={variantIndex}>{key}</TableHead>
                                );
                              }
                              return null;
                            })}
                            <TableHead className="px-4 py-2 border">Giá bán lẻ</TableHead>
                            <TableHead className="px-4 py-2 border">Số lượng</TableHead>
                            <TableHead className="px-4 py-2 border">SKU Người bán</TableHead>
                            <TableHead className="px-4 py-2 border"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {variantCombinations.map((combination, index) => (
                            <TableRow className="hover:bg-gray-100" key={index}>
                              {variantOptions.map((variant, variantIndex) => {
                                  if (variant) {
                                      return variant.attributes.map((attribute, attributeIndex) => {
                                          const [key, value] = Object.entries(attribute)[0];
                                          const options = Object.values(combination);

                                          if (options.includes(value)) {
                                            return (
                                              <TableCell className="px-4 py-2 border">
                                                {value}
                                              </TableCell>
                                            )
                                            
                                          }
                                          return null; 
                                      });
                                  }
                                  return null; 
                              })}
                              <TableCell className="px-4 py-2 border">
                                <Input
                                  type="number"
                                  value={combination.price}
                                  onChange={(e) => handleVariantCombinationChange(index, 'price', e.target.value)}
                                  placeholder="Giá" className="border rounded p-1" />
                              </TableCell>
                              <TableCell className="px-4 py-2 border">
                                <Input
                                  type="number"
                                  value={combination.quantity}
                                  onChange={(e) => handleVariantCombinationChange(index, 'quantity', e.target.value)}
                                  placeholder="Số lượng" className="border rounded p-1" />
                              </TableCell>
                              <TableCell className="px-4 py-2 border">
                                <Input
                                  value={combination.sku}
                                  onChange={(e) => handleVariantCombinationChange(index, 'sku', e.target.value)}
                                  placeholder="SKU" className="border rounded p-1" />
                              </TableCell>
                              <TableCell className="px-4 py-2 border">
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
                {!activateVariants && (
                  <Table>
                  <TableHeader>
                    <TableHead>Giá bán lẻ</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>SKU Người bán</TableHead>
                    <TableHead></TableHead>
                  </TableHeader>
                  <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input
                            type="number"
                            value={variantCombinations[0]?.price}
                            onChange={(e) => handleNotVariantCombinationChange('price', e.target.value)}
                            placeholder="Giá" />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={variantCombinations[0]?.quantity}
                            onChange={(e) => handleNotVariantCombinationChange('quantity', e.target.value)}
                            placeholder="Số lượng" />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={variantCombinations[0]?.sku}
                            onChange={(e) => handleNotVariantCombinationChange('sku', e.target.value)}
                            placeholder="SKU" />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteVariantCombination(0)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
                )}
                <div className="p-6">
                  <h1 className="text-xl font-semibold mb-4 mt-10">Vận chuyển</h1>
                  <div className="mb-6">
                    <Label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500">*</span> Trọng lượng Sản phẩm <InfoIcon className="inline-block w-4 h-4" />
                    </Label>
                    <div className="flex items-center">
                      <Select>
                        <option>Gram (g)</option>
                      </Select>
                      <Input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={handleWeightChange}
                        placeholder="Nhập trọng lượng sản phẩm"
                        className={`rounded-l-none flex-1 ${errors.weight ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.weight && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.weight}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                      Kích thước Sản phẩm <InfoIcon className="inline-block w-4 h-4" />
                    </Label>
                    <p className="text-sm text-gray-500 mb-4">
                      Đảm bảo trọng lượng và kích thước hộp chính xác vì chúng sẽ được sử dụng để tính phí vận chuyển và phương thức vận chuyển.{' '}
                      <a href="#" className="text-blue-500">
                        Ví dụ
                      </a>
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Input
                            type="number"
                            value={dimensions.height}
                            onChange={(e) => handleDimensionChange(e, 'height')}
                            placeholder="Chiều cao"
                            className={`flex-1 ${errors.height ? 'border-red-500' : ''}`}
                          />
                          <span className="ml-2">cm</span>
                        </div>
                        {errors.height && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.height}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Input
                            type="number"
                            value={dimensions.width}
                            onChange={(e) => handleDimensionChange(e, 'width')}
                            placeholder="Chiều rộng"
                            className={`flex-1 ${errors.width ? 'border-red-500' : ''}`}
                          />
                          <span className="ml-2">cm</span>
                        </div>
                        {errors.width && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.width}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Input
                            type="number"
                            value={dimensions.length}
                            onChange={(e) => handleDimensionChange(e, 'length')}
                            placeholder="Chiều dài"
                            className={`flex-1 ${errors.length ? 'border-red-500' : ''}`}
                          />
                          <span className="ml-2">cm</span>
                        </div>
                        {errors.length && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.length}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </CardContent>
      </Card>
              <button onClick={showData}>Get data</button>
    </div>)
  );
}