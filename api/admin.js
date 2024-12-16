import axiosClient from "./axiosClient";
const baseUrl = "/api/admin"; 
const adminAPI = {
    store: {
      getAllStore: () => axiosClient.get(`${baseUrl}/stores`),
      updateStore: (storeId, active) => axiosClient.put(`${baseUrl}/store/status`, {storeId,active}),
    },
    account: { 
      getAllAccountAdmin : () => axiosClient.get(`${baseUrl}/accounts`),
      createAccount: (accountData) => axiosClient.post(`${baseUrl}/register` ,accountData ),
      deleteAccount: (userId) => axiosClient.delete(`${baseUrl}/delete/${userId}`)
    }
  };
  

export default adminAPI