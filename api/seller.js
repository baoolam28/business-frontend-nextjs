import axiosClient from "./axiosClient";
const baseUrl = "/api/seller";
const sellerAPI = {
  product: {
    getAllProductsByStoreId: (storeId) =>
      axiosClient.get(`${baseUrl}/products/${storeId}`),
    getProductsOnline: (storeId) =>
      axiosClient.get(`${baseUrl}/products/online/${storeId}`),
    getProductsOffline: (storeId) =>
      axiosClient.get(`${baseUrl}/products/offline/${storeId}`),
    createProductOnline: (data) =>
      axiosClient.post(`${baseUrl}/products/online`, data),
    createProductOffline: (data) =>
      axiosClient.post(`${baseUrl}/products/offline`, data),
    updateProductOffline: (data) =>
      axiosClient.post(`${baseUrl}/products/offline/update`, data),
    deleteProductOffline: (id) =>
      axiosClient.delete(`${baseUrl}/products/offline/delete/${id}`),
  },
  category: {
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
    getCategoriesByStore: (storeId) =>
      axiosClient.get(`${baseUrl}/categories/by-store/${storeId}`),
  },
  origin: {
    getAllOrigins: () => axiosClient.get(`${baseUrl}/origins`),
  },
  supplier: {
    getAllSuppliers: (storeId) =>
      axiosClient.get(`${baseUrl}/suppliers/${storeId}`),
    createSupplier: (supplierData) =>
      axiosClient.post(`${baseUrl}/suppliers`, supplierData),
    updateSupplier: (supplierId, supplierData) =>
      axiosClient.put(`${baseUrl}/suppliers/${supplierId}`, supplierData),
    deleteSupplier: (supplierId) =>
      axiosClient.delete(`${baseUrl}/suppliers/${supplierId}`),
  },
  inventory: {
    getAllInventory: (storeId) =>
      axiosClient.get(`${baseUrl}/inventories/${storeId}`),
  },
  store: {
    getStoreByUserId: (userId) =>
      axiosClient.get(`${baseUrl}/store/by-user/${userId}`),
  },

  document: {
    createDocument: (data) => axiosClient.post(`${baseUrl}/documents`, data),
    getDocumentByStore: (storeId) =>
      axiosClient.get(`${baseUrl}/documents/${storeId}`),
  },

  order: {
    getOrdersOnlineByStoreId: (storeId) =>
      axiosClient.get(`${baseUrl}/orders/online/${storeId}`),
    getOderOfflineByStoreId: (storeId) =>
      axiosClient.get(`${baseUrl}/orders/offline/${storeId}`),
    getOrderById: (orderId) => axiosClient.get(`${baseUrl}/orders/${orderId}`),
    createOrder: (orderData) =>
      axiosClient.post(`${baseUrl}/orders`, orderData),
    updateOrder: (orderId, PaymentData) =>
      axiosClient.put(`${baseUrl}/orders/${orderId}/payment`, PaymentData),
    deleteOrder: () => axiosClient.delete(`${baseUrl}/orders/${orderId}`),
    getAllProductByOrderId: (orderId) =>
      axiosClient.get(`${baseUrl}/orders/${storeId}/products`),
    updateOrderDetail: (orderData, orderId) =>
      axiosClient.put(`${baseUrl}/orders/update/${orderId}`, orderData),
    updateOrderOnlineById: (orderId, newStatus) => 
      axiosClient.put(`${baseUrl}/orders/online/${orderId}/status`, newStatus),

  },
  customer: {
    getAllCustomerByStoreId: (storeId) =>
      axiosClient.get(`${baseUrl}/customers/store/${storeId}`),
    createCustomer: (customerData) =>
      axiosClient.post(`${baseUrl}/customers`, customerData),
    updateCustomer: () =>
      axiosClient.put(`${baseUrl}/customers/${customersId}`),
    deleteCustomer: () =>
      axiosClient.delete(`${baseUrl}/customers/${customersId}`),
  },
  payment: {
    createQrCode: (qrData) => axiosClient.post(`${baseUrl}/qr/create`, qrData),
  },
  report: {
    getOrderByDay: (storeId, startDate, endDate) =>
      axiosClient.get(`${baseUrl}/reports/${storeId}/by-day`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        }
      }
    ),
    getOrderByToday: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/by-toDay`),
    getOrderByMonth: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/by-month`),
    getOrderByYear: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/by-year`),
    getTotalOrder: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/total-value`),
    getTop3Customers: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/top-customers`),
    getTop3Products: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/top-products`),
    getAllOrderByStoreId: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/all-orders`),
    getOrderDetailByStoreId: (storeId) => axiosClient.get(`${baseUrl}/reports/${storeId}/order-detail`)
  },
  auth: {
    getAllStaffByStoreId: (storeId) => axiosClient.get(`${baseUrl}/auth/${storeId}`),
    createNewStaff: (staffData) => axiosClient.post(`${baseUrl}/auth`, staffData),
    deleteStaff: (userId) => axiosClient.delete(`${baseUrl}/auth/${userId}`)
  }
};

export default sellerAPI;

