import axiosClient from "./axiosClient";
const baseUrl = "/api/customers";

const customer = {
  // Fetch all customers
  getAllCustomersByStore() {
    const url = (`${baseUrl}/store`);
    return axiosClient.get(url);
  },

  // Create a new customer
  createCustomer(customerData) {
    const url = (`${baseUrl}`);
    return axiosClient.post(url, customerData);
  },

  // Update an existing customer
  updateCustomer(customerId, customerData) {
    const url = (`${baseUrl}/${customerId}`);
    return axiosClient.put(url, customerData);
  },

  // Delete a customer
  deleteCustomer(customerId) {
    const url = (`${baseUrl}/${customerId}`);;
    return axiosClient.delete(url);
  },
};

export default customer;
