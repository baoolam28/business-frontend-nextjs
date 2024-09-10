import axiosClient from "./axiosClient";

const inventory = {
  // Fetch all inventories
  getAllInventory() {
    const url = "/inventories";
    return axiosClient.get(url);
  },

  // Create a new inventory
  createInventory(inventoryData) {
    const url = "/inventories";
    return axiosClient.post(url, inventoryData);
  },

  // Update an existing inventory
  updateInventory(inventoryId, inventoryData) {
    const url = `/inventories/${inventoryId}`;
    return axiosClient.put(url, inventoryData);
  },

  // Delete a inventory
  deleteInventory(inventoryId) {
    const url = `/inventories/${inventoryId}`;
    return axiosClient.delete(url);
  },
};

export default inventory;
