import axiosClient from "./axiosClient";
const baseUrl = "/api/admin"; 
const adminAPI = {
    store: {
      getAllStore: () => axiosClient.get(`${baseUrl}/stores`),
      updateStore: (storeId, active) => axiosClient.put(`${baseUrl}/store/status`, {storeId,active}),
    },
  };
  

export default adminAPI