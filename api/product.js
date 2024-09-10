import axiosClient from "./axiosClient";

const product = {
  // Fetch all products
  getAllProduct() {
    const url = "/products";
    return axiosClient.get(url);
  },

  // Create a new product
  createProduct(productData) {
    const url = "/products";
    return axiosClient.post(url, productData);
  },

  // Update an existing product
  updateProduct(productId, productData) {
    const url = `/products/${productId}`;
    return axiosClient.put(url, productData);
  },

  // Delete a product
  deleteProduct(productId) {
    const url = `/products/${productId}`;
    return axiosClient.delete(url);
  },

  // Fetch a single product
  getProductById(productId) {
    const url = `/products/${productId}`;
    return axiosClient.get(url);
  },
};

export default product;
