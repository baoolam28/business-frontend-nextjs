"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/admin";
var adminAPI = {
  store: {
    getAllStore: function getAllStore() {
      return _axiosClient["default"].get("".concat(baseUrl, "/stores"));
    },
    updateStore: function updateStore(storeId, active) {
      return _axiosClient["default"].put("".concat(baseUrl, "/store/status"), {
        storeId: storeId,
        active: active
      });
    }
  }
};
var _default = adminAPI;
exports["default"] = _default;