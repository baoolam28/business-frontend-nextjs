import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products`),
    getAllBestSeller: () => axiosClient.get(`${baseUrl}/products/bestseller`),
    getByIdProduct:(id) => axiosClient.get(`${baseUrl}/products/${id}`)
  },
  category:{
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
  },
  cart:{
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/cart/${userId}`),
    updateCartItems: (cartId, productId, quantity) => axiosClient.put(`${baseUrl}/cart/${cartId}/product/${productId}`,{quantity}),
    deleteCartItem: (cartId, productId) => axiosClient.delete(`${baseUrl}/cart/${cartId}/product/${productId}`)
  }
};

export default buyerAPI;
