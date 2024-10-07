import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products`),
    getAllBestSeller: () => axiosClient.get(`${baseUrl}/products/bestseller`),
  },
  category:{
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
  },
};

export default buyerAPI;
