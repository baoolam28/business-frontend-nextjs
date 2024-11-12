import { create } from "domain";
import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products/online`),
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
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/cart/get-by-user/${userId}`),
    addToCart: (cartRequest) => axiosClient.post(`${baseUrl}/cart/add-to-cart`, cartRequest),
    updateCartByUserId: (data) => axiosClient.put(`${baseUrl}/cart`,data),
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
  resetPassword : {
    sendEmail : (data) => axiosClient.put(`${baseUrl}/send-mail`, data),
    resetPasswordEmail : (data) => axiosClient.put(`${baseUrl}/reset-password-email`, data),
    resetPasswordPhoneNumber : (data) => axiosClient.put(`${baseUrl}/reset-password-phone`, data)
  }
  
};

export default buyerAPI;
