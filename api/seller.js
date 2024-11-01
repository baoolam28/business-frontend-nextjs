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
    updateSupplier: (supplierId, supplierData) => axiosClient.put(`${baseUrl}/suppliers/${supplierId}`, supplierData),
    deleteSupplier: (supplierId) => axiosClient.delete(`${baseUrl}/suppliers/${supplierId}`)
  },
  inventory: {
    getAllInventory: () => axiosClient.get(`${baseUrl}/inventories/${storeId}`),
  },
  store: {
    getStoreByUserId: (userId) => axiosClient.get(`${baseUrl}/store/by-user?userId=${userId}`),
    getAllOrderByStoreId : (storeId) => axiosClient.get(`${baseUrl}/orders-online/stores/${storeId}`)
    
  },
  order: { 
    updateOrderById: (orderId ,newStatus ) => axiosClient.put(`${baseUrl}/orders-online/${orderId}/status`,  { status: newStatus }),
    udateOrderByStoreID: (storeId ,newStatus ) => axiosClient.put(`${baseUrl}/orders-online/stores/${storeId}/status`, { status: newStatus })
  }
};

export default sellerAPI;
