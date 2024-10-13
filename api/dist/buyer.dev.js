"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
    getByIdProduct: function getByIdProduct(id) {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/").concat(id));
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
  }
};
var _default = buyerAPI;
exports["default"] = _default;