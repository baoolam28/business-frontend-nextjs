import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products`),
  },
  category:{
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
  },
};

export default buyerAPI;
