// reactSweetAlert.js
import Swal from "sweetalert2";


const showAlert = (options) => {
  return Swal.fire(options);
};

export const showSuccessAlert = (title, message) => {
  return showAlert({
    title: <strong>{title}</strong>,
    html: <i>{message}</i>,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (title, message) => {
  return showAlert({
    title: <strong>{title}</strong>,
    html: <i>{message}</i>,
    icon: "error",
    confirmButtonText: "Close",
  });
};

export const showCustomAlert = (options) => {
  return showAlert(options);
};
