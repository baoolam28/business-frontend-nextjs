"use client"
import React, { useState } from 'react';
import SellerAPI from "../../../../../api/seller"

const ProductUploader = () => {
  // Dữ liệu mẫu cho ProductDetailRequest
  const sampleProductDetail = {
    price: 19.99,
    sku: 'SKU12345',
    quantityInStock: 100,
    image: null, // sẽ gán sau
    attributes: {
      color: 'Red',
      size: 'M',
    },
  };

  // State cho sản phẩm
  const [productName, setProductName] = useState('Sample Product');
  const [description, setDescription] = useState('This is a sample product description.');
  const [categoryId, setCategoryId] = useState(1); // Sử dụng ID mẫu
  const [price, setPrice] = useState(29.99);
  const [storeId, setStoreId] = useState('store-uuid'); // UUID mẫu
  const [images, setImages] = useState([]);
  const [productDetail, setProductDetail] = useState([sampleProductDetail]); // Dữ liệu mẫu

  const handleFileChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
    }
  };

  const handleDetailImageChange = (index, event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const updatedDetails = [...productDetail];
      updatedDetails[index].image = file; // Gán file vào trường image
      setProductDetail(updatedDetails);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('price', price);
    formData.append('storeId', storeId);

    // Append main images
    images.forEach((image) => {
      formData.append('images', image);
    });

    // Append product details
    productDetail.forEach((detail, index) => {
      formData.append(`productDetail[${index}].price`, detail.price);
      formData.append(`productDetail[${index}].sku`, detail.sku);
      formData.append(`productDetail[${index}].quantityInStock`, detail.quantityInStock);

      if (detail.image) {
        formData.append(`productDetail[${index}].image`, detail.image);  // Handle file uploads
      }

      // Append attributes
      Object.entries(detail.attributes).forEach(([key, value]) => {
        formData.append(`productDetail[${index}].attributes[${key}]`, value);
      });
    });

    try {
       console.log('FormData values:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
      const response = await SellerAPI.product.createProductOnline(formData);
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload Product</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
        className="block w-full border-slate-400 rounded mb-4"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="block w-full border-slate-400 rounded mb-4"
      />
      <input
        type="number"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        placeholder="Category ID"
        className="block w-full border-slate-400 rounded mb-4"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        className="block w-full border-slate-400 rounded mb-4"
      />
      <input
        type="text"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
        placeholder="Store ID"
        className="block w-full border-slate-400 rounded mb-4"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full border-slate-400 rounded mb-4"
      />

      {/* Hiển thị thông tin chi tiết sản phẩm mẫu */}
      {productDetail.map((detail, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-bold">Product Detail {index + 1}</h3>
          <input
            type="number"
            value={detail.price}
            onChange={(e) => {
              const updatedDetail = [...productDetail];
              updatedDetail[index].price = Number(e.target.value);
              setProductDetail(updatedDetail);
            }}
            placeholder="Detail Price"
            className="block w-full border-slate-400 rounded mb-2"
          />
          <input
            type="text"
            value={detail.sku}
            onChange={(e) => {
              const updatedDetail = [...productDetail];
              updatedDetail[index].sku = e.target.value;
              setProductDetail(updatedDetail);
            }}
            placeholder="SKU"
            className="block w-full border-slate-400 rounded mb-2"
          />
          <input
            type="number"
            value={detail.quantityInStock}
            onChange={(e) => {
              const updatedDetail = [...productDetail];
              updatedDetail[index].quantityInStock = Number(e.target.value);
              setProductDetail(updatedDetail);
            }}
            placeholder="Quantity in Stock"
            className="block w-full border-slate-400 rounded mb-2"
          />
          <input
            type="file"
            onChange={(e) => handleDetailImageChange(index, e)}
            className="block w-full border-slate-400 rounded mb-2"
          />
          {/* Hiển thị attributes */}
          {Object.entries(detail.attributes).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="mr-2">{key}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  const updatedDetail = [...productDetail];
                  updatedDetail[index].attributes[key] = e.target.value;
                  setProductDetail(updatedDetail);
                }}
                className="border-slate-400 rounded"
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleUpload}>Upload Product</button>
    </div>
  );
};

export default ProductUploader;
