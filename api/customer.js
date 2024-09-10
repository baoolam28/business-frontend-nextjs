import axiosClient from "./axiosClient";

const customer = {
  // Fetch all customers
  getAllCustomers() {
    const url = "/customers";
    return axiosClient.get(url);
  },

  // Create a new customer
  createCustomer(customerData) {
    const url = "/customers";
    return axiosClient.post(url, customerData);
  },

  // Update an existing customer
  updateCustomer(customerId, customerData) {
    const url = `/customers/${customerId}`;
    return axiosClient.put(url, customerData);
  },

  // Delete a customer
  deleteCustomer(customerId) {
    const url = `/customers/${customerId}`;
    return axiosClient.delete(url);
  },
};

export default customer;
