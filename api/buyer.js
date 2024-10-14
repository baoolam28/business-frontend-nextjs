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
  cart : {
    // Lấy thông tin giỏ hàng theo userId
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/cart/get-by-user/${userId}`),

    // Thêm sản phẩm vào giỏ hàng
    addToCart: (cartRequest) => axiosClient.post(`${baseUrl}/cart/add-to-cart`, cartRequest),

    // Cập nhật sản phẩm trong giỏ hàng
    updateCart: (cartRequest) => axiosClient.put(`${baseUrl}/cart/update-cart`, cartRequest),

    // Xóa sản phẩm khỏi giỏ hàng
    deleteProductFromCart: (cartRequest) => axiosClient.delete(`${baseUrl}/cart/delete-product`, {
      data: cartRequest
    })
  },
  shippingAddress : {
    getShippingAddressByUserId : (userId) => axiosClient.get(`${baseUrl}/shipping-addresses/${userId}`),
    createShippingAddressByUserId : (userId) => axiosClient.post(`${baseUrl}/shipping-addresses/${userId}`),
    deleteShippingAddressById : (categoryId) => axiosClient.delete(`${baseUrl}/shipping-addresses/${categoryId}`)
  },

};

export default buyerAPI;
