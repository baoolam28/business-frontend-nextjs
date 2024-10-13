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
<<<<<<< HEAD
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

=======
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
>>>>>>> c5a041c936d2438ed743c3a1a9ea2a2f52c6d3cc
};

export default buyerAPI;
