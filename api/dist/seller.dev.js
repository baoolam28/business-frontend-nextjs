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
    getAllProductsByStoreId: function getAllProductsByStoreId(storeId) {
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
      return _axiosClient["default"].get("".concat(baseUrl, "/store/by-user/").concat(userId));
    },
    getAllOrderByStoreId: function getAllOrderByStoreId(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/orders/stores/").concat(storeId));
    }
  },
  order: {
    getAllOdersByStoreId: function getAllOdersByStoreId(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/orders/store/").concat(storeId));
    },
    getOrderById: function getOrderById(orderId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/orders/").concat(orderId));
    },
    createOrder: function createOrder(orderData) {
      return _axiosClient["default"].post("".concat(baseUrl, "/orders"), orderData);
    },
    updateOrder: function updateOrder(orderId, PaymentData) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders/").concat(orderId, "/payment"), PaymentData);
    },
    deleteOrder: function deleteOrder() {
      return _axiosClient["default"]["delete"]("".concat(baseUrl, "/orders/").concat(orderId));
    },
    getAllProductByOrderId: function getAllProductByOrderId(orderId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/orders/").concat(storeId, "/products"));
    },
    updateOrderDetail: function updateOrderDetail(orderData, orderId) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders/update/").concat(orderId), orderData);
    },
    updateOrderById: function updateOrderById(orderId, newStatus) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders/").concat(orderId, "/status"), {
        status: newStatus
      });
    },
    // Cập nhật phương thức udateOrderByStoreID để nhận thêm tham số status
    udateOrderByStoreID: function udateOrderByStoreID(storeId, newStatus) {
      return _axiosClient["default"].put("".concat(baseUrl, "/orders/stores/").concat(storeId, "/status"), {
        status: newStatus
      });
    }
  },
  customer: {
    getAllCustomerssByStoreId: function getAllCustomerssByStoreId(storeId) {
      return _axiosClient["default"].get("".concat(baseUrl, "/customers/store/").concat(storeId));
    },
    createCustomer: function createCustomer(customerData) {
      return _axiosClient["default"].post("".concat(baseUrl, "/customers"), customerData);
    },
    updateCustomer: function updateCustomer() {
      return _axiosClient["default"].put("".concat(baseUrl, "/customers/").concat(customersId));
    },
    deleteCustomer: function deleteCustomer() {
      return _axiosClient["default"]["delete"]("".concat(baseUrl, "/customers/").concat(customersId));
    }
  },
  payment: {
    createQrCode: function createQrCode(qrData) {
      return _axiosClient["default"].post("".concat(baseUrl, "/qr/create"), qrData);
    }
  }
};
var _default = sellerAPI;
exports["default"] = _default;