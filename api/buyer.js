import axiosClient from "./axiosClient";
const baseUrl = "/api/buyer";
const buyerAPI = {
  product: {
    getAllProducts: () => axiosClient.get(`${baseUrl}/products`),
    getAllBestSeller: () => axiosClient.get(`${baseUrl}/products/bestseller`),
    getProductById:(id) => axiosClient.get(`${baseUrl}/products/${id}`),
    getProductDetails: (id) => axiosClient.get(`${baseUrl}/products/product-detail/${id}`),
  },
  category:{
    getAllCategories: () => axiosClient.get(`${baseUrl}/categories`),
    getProductByCategory : (id) => axiosClient.get(`${baseUrl}/products/category/${id}`),
    getAllSotre : () => axiosClient.get(`${baseUrl}/stores`)
  },
  cart:{
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/cart/${userId}`),
    updateCartItems: (cartId, productId, quantity) => axiosClient.put(`${baseUrl}/cart/${cartId}`, {
      productId: productId,
      quantity: quantity
    }),
    deleteCartItem: (cartId, productId) => axiosClient.delete(`${baseUrl}/cart/${cartId}/product/${productId}`),
    addProductToCart: (cartId, productId, quantity, price) => axiosClient.post(`${baseUrl}/cart/${cartId}`,{
      productId: productId,
      quantity: quantity,
      price: price
    })
  }
};

export default buyerAPI;
