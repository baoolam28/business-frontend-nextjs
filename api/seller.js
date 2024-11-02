import axiosClient from "./axiosClient";
const baseUrl = "/api/seller";
const sellerAPI = {
  product: {
    getAllProductsByStoreId: (storeId) => axiosClient.get(`${baseUrl}/products/${storeId}`),
    createProductOnline: (data) => axiosClient.post(`${baseUrl}/products/online`, data),
    createProductOffline: (data) => axiosClient.post(`${baseUrl}/products/offline`,data),
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
    getStoreByUserId: (userId) => axiosClient.get(`${baseUrl}/store/by-user/${userId}`),
    getAllOrderByStoreId : (storeId) => axiosClient.get(`${baseUrl}/orders/stores/${storeId}`)
    
  },

  order: {
    getAllOdersByStoreId: (storeId) => axiosClient.get(`${baseUrl}/orders/store/${storeId}`),
    getOrderById: (orderId) => axiosClient.get(`${baseUrl}/orders/${orderId}`),
    createOrder: (orderData) => axiosClient.post(`${baseUrl}/orders`, orderData),
    updateOrder: (orderId, PaymentData) => axiosClient.put(`${baseUrl}/orders/${orderId}/payment`, PaymentData),
    deleteOrder: () => axiosClient.delete(`${baseUrl}/orders/${orderId}`),
    getAllProductByOrderId: (orderId) => axiosClient.get(`${baseUrl}/orders/${storeId}/products`),
    updateOrderDetail: (orderData, orderId) => axiosClient.put(`${baseUrl}/orders/update/${orderId}`, orderData),
    updateOrderById: (orderId, newStatus) => 
      axiosClient.put(`${baseUrl}/orders/${orderId}/status`, { status: newStatus }),

  // Cập nhật phương thức udateOrderByStoreID để nhận thêm tham số status
  udateOrderByStoreID: (storeId, newStatus) => 
      axiosClient.put(`${baseUrl}/orders/stores/${storeId}/status`, { status: newStatus })
  },
  customer: {
    getAllCustomerssByStoreId: (storeId) => axiosClient.get(`${baseUrl}/customers/store/${storeId}`),
    createCustomer: (customerData) => axiosClient.post(`${baseUrl}/customers`, customerData),
    updateCustomer: () => axiosClient.put(`${baseUrl}/customers/${customersId}`),
    deleteCustomer: () => axiosClient.delete(`${baseUrl}/customers/${customersId}`)
  },
  payment: {
    createQrCode: (qrData) => axiosClient.post(`${baseUrl}/qr/create`, qrData)

  }
};

export default sellerAPI;
