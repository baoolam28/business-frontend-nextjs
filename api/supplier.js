import axiosClient from "./axiosClient";

const product = {
  // Fetch all suppliers
  getAllSupplier() {
    const url = "/suppliers";
    return axiosClient.get(url);
  },

  // Create a new product
  createSupplier(supplierData) {
    const url = "/suppliers";
    return axiosClient.post(url, supplierData);
  },

  // Update an existing product
  updateSupplier(supplierId, supplierData) {
    const url = `/suppliers/${supplierId}`;
    return axiosClient.put(url, supplierData);
  },

  // Delete a product
  deleteSupplier(supplierId) {
    const url = `/suppliers/${supplierId}`;
    return axiosClient.delete(url);
  },
};

export default product;
