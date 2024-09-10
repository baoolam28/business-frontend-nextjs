import axiosClient from "./axiosClient";

const inventory = {
  // Fetch all origins
  getAllOrigin() {
    const url = "/origins";
    return axiosClient.get(url);
  },

  // Create a new inventory
  createOrigin(originData) {
    const url = "/origins";
    return axiosClient.post(url, originData);
  },

  // Update an existing inventory
  updateOrigin(originId, originData) {
    const url = `/origins/${originId}`;
    return axiosClient.put(url, originData);
  },

  // Delete a inventory
  deleteOrigin(originId) {
    const url = `/origins/${originId}`;
    return axiosClient.delete(url);
  },
};

export default inventory;
