"use strict";

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/buyer";
var buyerAPI = {
  product: {
    getAllProducts: function getAllProducts() {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/online"));
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
    getCartByUserId: function getCartByUserId(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/cart/get-by-user/").concat(userId));
    },
    addToCart: function addToCart(cartRequest) {
      return _axiosClient["default"].post("".concat(baseUrl, "/cart/add-to-cart"), cartRequest);
    },
    updateCartByUserId: function updateCartByUserId(data) {
      return _axiosClient["default"].put("".concat(baseUrl, "/cart"), data);
    }
  },
  orderStatus: {
    getAllOrderStatus: function getAllOrderStatus(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/purchase/orderOnline/").concat(userId));
    },
    getShipment: function getShipment(shipmentId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/purchase/").concat(shipmentId));
    }
  },
  shippingAddress: {
    getShippingAddressByUserId: function getShippingAddressByUserId(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/shipping-addresses/").concat(userId));
    },
    getAddressById: function getAddressById(addressId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/shipping-addresses/address/").concat(addressId));
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
  register: {
    createNewUser: function createNewUser(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/register"), data);
    }
  },
  otp: {
    sendOtp: function sendOtp(phoneNumber) {
      return _axiosClient["default"].post("".concat(baseUrl, "/send-otp"), {
        phoneNumber: phoneNumber
      });
    },
    verifyOtp: function verifyOtp(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/verify-otp"), data);
    }
  },
  store: {
    createStore: function createStore(dataStore) {
      return _axiosClient["default"].post("".concat(baseUrl, "/stores"), dataStore);
    }
  },
  resetPassword: {
    sendEmail: function sendEmail(data) {
      return _axiosClient["default"].put("".concat(baseUrl, "/send-mail"), data);
    },
    resetPasswordEmail: function resetPasswordEmail(data) {
      return _axiosClient["default"].put("".concat(baseUrl, "/reset-password-email"), data);
    },
    resetPasswordPhoneNumber: function resetPasswordPhoneNumber(data) {
      return _axiosClient["default"].put("".concat(baseUrl, "/reset-password-phone"), data);
    }
  }
};