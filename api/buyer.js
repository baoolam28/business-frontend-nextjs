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
  cart : {
    // Lấy thông tin giỏ hàng theo userId
    getCartByUserId: (userId) => axiosClient.get(`${baseUrl}/api/buyer/cart/get-by-user/${userId}`),

    // Thêm sản phẩm vào giỏ hàng
    addToCart: (cartRequest) => axiosClient.post(`${baseUrl}/api/buyer/cart/add-to-cart`, cartRequest),

    // Cập nhật sản phẩm trong giỏ hàng
    updateCart: (cartRequest) => axiosClient.put(`${baseUrl}/api/buyer/cart/update-cart`, cartRequest),

    // Xóa sản phẩm khỏi giỏ hàng
    deleteProductFromCart: (cartRequest) => axiosClient.delete(`${baseUrl}/api/buyer/cart/delete-product`, {
      data: cartRequest
    })
  },

};

export default buyerAPI;
