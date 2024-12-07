"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _domain = require("domain");

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/buyer";
var buyerAPI = {
  product: {
    getAllProducts: function getAllProducts() {
      return _axiosClient["default"].get("".concat(baseUrl, "/products"));
    },
    getAllBestSeller: function getAllBestSeller() {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/bestseller"));
    },
    getProductById: function getProductById(id) {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/").concat(id));
    },
    getProductDetails: function getProductDetails(id) {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/product-detail/").concat(id));
    }
  },
  category: {
    getAllCategories: function getAllCategories() {
      return _axiosClient["default"].get("".concat(baseUrl, "/categories"));
    },
    getProductByCategory: function getProductByCategory(id) {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/category/").concat(id));
    },
    getAllSotre: function getAllSotre() {
      return _axiosClient["default"].get("".concat(baseUrl, "/stores"));
    }
  },
  cart: {
    // Lấy thông tin giỏ hàng theo userId
    getCartByUserId: function getCartByUserId(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/cart/get-by-user/").concat(userId));
    },
    // Thêm sản phẩm vào giỏ hàng
    addToCart: function addToCart(cartRequest) {
      return _axiosClient["default"].post("".concat(baseUrl, "/cart/add-to-cart"), cartRequest);
    },
    // Cập nhật sản phẩm trong giỏ hàng
    updateCart: function updateCart(cartRequest) {
      return _axiosClient["default"].put("".concat(baseUrl, "/cart/update-cart"), cartRequest);
    },
    // Xóa sản phẩm khỏi giỏ hàng
    deleteProductFromCart: function deleteProductFromCart(cartRequest) {
      return _axiosClient["default"]["delete"]("".concat(baseUrl, "/cart/delete-product"), {
        data: cartRequest
      });
    }
  },
  shippingAddress: {
    getShippingAddressByUserId: function getShippingAddressByUserId(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/shipping-addresses/").concat(userId));
    },
    createShippingAddressByUserId: function createShippingAddressByUserId(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/shipping-addresses"), data);
    },
    deleteShippingAddressById: function deleteShippingAddressById(categoryId) {
      return _axiosClient["default"]["delete"]("".concat(baseUrl, "/shipping-addresses/").concat(categoryId));
    }
  },
  order: {
    createOrderOnline: function createOrderOnline(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/ordersOnline"), data);
    }
  },
  store: {
    createStore: function createStore(dataStore) {
      return _axiosClient["default"].post("".concat(baseUrl, "/stores"), dataStore);
    }
  }
};
var _default = buyerAPI;
exports["default"] = _default;