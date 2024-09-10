import axiosClient from "./axiosClient";

const inventory = {
  // Fetch all categories
  getAllCategory() {
    const url = "/categories";
    return axiosClient.get(url);
  },

  // Create a new inventory
  createCategory(categoryData) {
    const url = "/categories";
    return axiosClient.post(url, categoryData);
  },

  // Update an existing inventory
  updateCategory(categoryId, categoryData) {
    const url = `/categories/${categoryId}`;
    return axiosClient.put(url, categoryData);
  },

  // Delete a inventory
  deleteCategory(categoryId) {
    const url = `/categories/${categoryId}`;
    return axiosClient.delete(url);
  },
};

export default inventory;
