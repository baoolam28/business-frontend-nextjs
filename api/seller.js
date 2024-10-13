import axiosClient from "./axiosClient";
const baseUrl = "/api/seller";
const sellerAPI = {
  product: {
    getAllProductsByStoreId: (storeId) => axiosClient.get(`${baseUrl}/products/${storeId}`),
  },
  category: {
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
  },
  store: {
    getStoreByUserId: (userId) =>
      axiosClient.get(`${baseUrl}/store/by-user?userId=${userId}`),
  },
  order: {
    getAllOdersByStoreId: (storeId) => axiosClient.get(`${baseUrl}/orders/store/${storeId}`),
    getOrderById: (orderId) => axiosClient.get(`${baseUrl}/orders/${orderId}`),
    createOrder: (orderData) => axiosClient.post(`${baseUrl}/orders`, orderData),
    updateOrder: () => axiosClient.put(`${baseUrl}/orders/${orderId}/payment`),
    deleteOrder: () => axiosClient.delete(`${baseUrl}/orders/${orderId}`)
  },
  customer: {
    getAllCustomerssByStoreId: (storeId) => axiosClient.get(`${baseUrl}/customers/store/${storeId}`),
    createCustomer: (customerData) => axiosClient.post(`${baseUrl}/customers`, customerData),
    updateCustomer: () => axiosClient.put(`${baseUrl}/customers/${customersId}`),
    deleteCustomer: () => axiosClient.delete(`${baseUrl}/customers/${customersId}`)
  }
};

export default sellerAPI;
