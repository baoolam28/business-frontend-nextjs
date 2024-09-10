import axiosClient from "./axiosClient";

const order = {
  // Fetch all orders
  getAllOrder() {
    const url = "/orders";
    return axiosClient.get(url);
  },

  // Create a new order
  createOrder(orderData) {
    const url = "/orders";
    return axiosClient.post(url, orderData);
  },

  // Update an existing order
  updateOrder(orderId, orderData) {
    const url = `/orders/${orderId}`;
    return axiosClient.put(url, orderData);
  },

  // Delete a order
  deleteOrder(orderId) {
    const url = `/orders/${orderId}`;
    return axiosClient.delete(url);
  },
};

export default order;
