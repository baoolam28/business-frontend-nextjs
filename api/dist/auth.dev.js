"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClient = _interopRequireDefault(require("./axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = {
  login: function login(username, password) {
    var url = "/api/auth/login";
    return _axiosClient["default"].post(url, {
      username: username,
      password: password
    });
  },
  googleSignIn: function googleSignIn(userData) {
    var url = "/api/auth/google-sign-in";
    return _axiosClient["default"].post(url, userData);
  },
  user: {
    getInfoUser: function getInfoUser(userId) {
      return _axiosClient["default"].get("/api/auth/user-info/".concat(userId));
    },
    updateInfoUser: function updateInfoUser(userId, formData) {
      return _axiosClient["default"].put("/api/auth/update-user/".concat(userId), formData);
    },
    updatePassUser: function updatePassUser(userId, fromData) {
      return regeneratorRuntime.async(function updatePassUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _axiosClient["default"].put("/api/auth/change-password/".concat(userId), fromData));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
var _default = auth;
exports["default"] = _default;