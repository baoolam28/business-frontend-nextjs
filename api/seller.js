import axiosClient from "./axiosClient";
const baseUrl = "/api/seller";
const sellerAPI = {
  product: {
    getAllProducts: (storeId) => axiosClient.get(`${baseUrl}/products/${storeId}`),
    createProductOnline: (data) => axiosClient.post(`${baseUrl}/products/online`, data),
  },
  category: {
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
  },
  origin: {
    getAllOrigins: () => axiosClient.get(`${baseUrl}/origins`),
  },
  supplier: {
    getAllSuppliers: (storeId) => axiosClient.get(`${baseUrl}/suppliers/${storeId}`),
    createSupplier: (supplierData) => axiosClient.post(`${baseUrl}/suppliers`, supplierData),
  },
  inventory: {
    getAllInventory: () => axiosClient.get(`${baseUrl}/inventories/${storeId}`),
  },
  store: {
    getStoreByUserId: (userId) =>
      axiosClient.get(`${baseUrl}/store/by-user?userId=${userId}`),
  },
};

export default sellerAPI;
