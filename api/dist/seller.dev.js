"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/seller";
var sellerAPI = {
  product: {
    getAllProducts: function getAllProducts(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/products/").concat(storeId));
    },
    createProductOnline: function createProductOnline(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/products/online"), data);

    },
    createProductOffline: function createProductOffline(data) {
      return _axiosClient["default"].post("".concat(baseUrl, "/products/offline"), data);

    }
  },
  category: {
    getAllCategories: function getAllCategories() {
      return _axiosClient["default"].get("".concat(baseUrl, "/categories"));
    }
  },
  origin: {
    getAllOrigins: function getAllOrigins() {
      return _axiosClient["default"].get("".concat(baseUrl, "/origins"));
    }
  },
  supplier: {
    getAllSuppliers: function getAllSuppliers(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/suppliers/").concat(storeId));
    },
    createSupplier: function createSupplier(supplierData) {
      return _axiosClient["default"].post("".concat(baseUrl, "/suppliers"), supplierData);
    },
    updateSupplier: function updateSupplier(supplierId, supplierData) {
      return _axiosClient["default"].put("".concat(baseUrl, "/suppliers/").concat(supplierId), supplierData);
    },
    deleteSupplier: function deleteSupplier(supplierId) {
      return _axiosClient["default"]["delete"]("".concat(baseUrl, "/suppliers/").concat(supplierId));
    }
  },
  inventory: {
    getAllInventory: function getAllInventory() {
      return _axiosClient["default"].get("".concat(baseUrl, "/inventories/").concat(storeId));
    }
  },
  store: {
    getStoreByUserId: function getStoreByUserId(userId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/store/by-user?userId=").concat(userId));
    },
    getAllOrderByStoreId: function getAllOrderByStoreId(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/orders-online/stores/").concat(storeId));
    }
  },
  order: {
    updateOrderById: function updateOrderById(orderId, newStatus) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders-online/").concat(orderId, "/status"), {
        status: newStatus
      });
    },
    udateOrderByStoreID: function udateOrderByStoreID(storeId, newStatus) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders-online/stores/").concat(storeId, "/status"), {
        status: newStatus
      });

    }
  }
};
var _default = sellerAPI;
exports["default"] = _default;