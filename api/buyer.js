import { create } from "domain";
import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products`),
    getAllBestSeller: () => axiosClient.get(`${baseUrl}/products/bestseller`),
    getProductById:(id) => axiosClient.get(`${baseUrl}/products/${id}`),
    getProductDetails: (id) => axiosClient.get(`${baseUrl}/products/product-detail/${id}`),
  },
  category:{
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
    getProductByCategory : (id) => axiosClient.get(`${baseUrl}/products/category/${id}`),
    getAllSotre : () => axiosClient.get(`${baseUrl}/stores`)
  },
  cart : {
    // Lấy thông tin giỏ hàng theo userId
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/cart/get-by-user/${userId}`),

    // Thêm sản phẩm vào giỏ hàng
    addToCart: (cartRequest) => axiosClient.post(`${baseUrl}/cart/add-to-cart`, cartRequest),

    // Cập nhật sản phẩm trong giỏ hàng
    updateCart: (cartRequest) => axiosClient.put(`${baseUrl}/cart/update-cart`, cartRequest),

    // Xóa sản phẩm khỏi giỏ hàng
    deleteProductFromCart: (cartRequest) => axiosClient.delete(`${baseUrl}/cart/delete-product`, {
      data: cartRequest
    })
  },

  orderStatus : {
    getAllOrderStatus: (userId) => axiosClient.get(`${baseUrl}/purchase/orderOnline/${userId}`),
    getShipment: (shipmentId) => axiosClient.get(`${baseUrl}/purchase/${shipmentId}`)
  },
  
  shippingAddress : {
    getShippingAddressByUserId : (userId) => axiosClient.get(`${baseUrl}/shipping-addresses/${userId}`),
    getAddressById : (addressId) => axiosClient.get(`${baseUrl}/shipping-addresses/address/${addressId}`),
    createShippingAddressByUserId : (data) => axiosClient.post(`${baseUrl}/shipping-addresses`,data),
    deleteShippingAddressById : (categoryId) => axiosClient.delete(`${baseUrl}/shipping-addresses/${categoryId}`)
  },
  order: {
    createOrderOnline : (data) => axiosClient.post(`${baseUrl}/ordersOnline`,data),
  },

  register : {
    createNewUser : (data) => axiosClient.post(`${baseUrl}/register`, data)
  },
  otp : {
    sendOtp : (phoneNumber) => axiosClient.post(`${baseUrl}/send-otp`, {phoneNumber}),
    verifyOtp : (data) => axiosClient.post(`${baseUrl}/verify-otp`, data)
  },
  store:{
    createStore : (dataStore) => axiosClient.post(`${baseUrl}/stores`,dataStore),

  },

  
};

