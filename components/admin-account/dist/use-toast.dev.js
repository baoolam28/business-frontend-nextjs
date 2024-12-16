"use strict";
"use client"; // Inspired by react-hot-toast library

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToast = useToast;
exports.toast = toast;
exports.reducer = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1000000;
var actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
};
var count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

var toastTimeouts = new Map();

var addToRemoveQueue = function addToRemoveQueue(toastId) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  var timeout = setTimeout(function () {
    toastTimeouts["delete"](toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return _objectSpread({}, state, {
        toasts: [action.toast].concat(_toConsumableArray(state.toasts)).slice(0, TOAST_LIMIT)
      });

    case "UPDATE_TOAST":
      return _objectSpread({}, state, {
        toasts: state.toasts.map(function (t) {
          return t.id === action.toast.id ? _objectSpread({}, t, {}, action.toast) : t;
        })
      });

    case "DISMISS_TOAST":
      {
        var toastId = action.toastId; // ! Side effects ! - This could be extracted into a dismissToast() action,
        // but I'll keep it here for simplicity

        if (toastId) {
          addToRemoveQueue(toastId);
        } else {
          state.toasts.forEach(function (toast) {
            addToRemoveQueue(toast.id);
          });
        }

        return _objectSpread({}, state, {
          toasts: state.toasts.map(function (t) {
            return t.id === toastId || toastId === undefined ? _objectSpread({}, t, {
              open: false
            }) : t;
          })
        });
      }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return _objectSpread({}, state, {
          toasts: []
        });
      }

      return _objectSpread({}, state, {
        toasts: state.toasts.filter(function (t) {
          return t.id !== action.toastId;
        })
      });
  }
};

exports.reducer = reducer;
var listeners = [];
var memoryState = {
  toasts: []
};

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(function (listener) {
    listener(memoryState);
  });
}

function toast(_ref) {
  var props = _extends({}, _ref);

  var id = genId();

  var update = function update(props) {
    return dispatch({
      type: "UPDATE_TOAST",
      toast: _objectSpread({}, props, {
        id: id
      })
    });
  };

  var dismiss = function dismiss() {
    return dispatch({
      type: "DISMISS_TOAST",
      toastId: id
    });
  };

  dispatch({
    type: "ADD_TOAST",
    toast: _objectSpread({}, props, {
      id: id,
      open: true,
      onOpenChange: function onOpenChange(open) {
        if (!open) dismiss();
      }
    })
  });
  return {
    id: id,
    dismiss: dismiss,
    update: update
  };
}

function useToast() {
  var _React$useState = React.useState(memoryState),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  React.useEffect(function () {
    listeners.push(setState);
    return function () {
      var index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return _objectSpread({}, state, {
    toast: toast,
    dismiss: function dismiss(toastId) {
      return dispatch({
        type: "DISMISS_TOAST",
        toastId: toastId
      });
    }
  });
}