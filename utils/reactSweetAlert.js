import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal); // Bọc SweetAlert2 để hỗ trợ React components

const showAlert = (options) => {
  return MySwal.fire(options); // Sử dụng MySwal thay vì Swal
};

export const showSuccessAlert = (title, message) => {
  return showAlert({
    title: <strong>{title}</strong>, // JSX được hỗ trợ
    html: <i>{message}</i>, // JSX được hỗ trợ
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (title, message) => {
  return showAlert({
    title: <strong>{title}</strong>, // JSX được hỗ trợ
    html: <i>{message}</i>, // JSX được hỗ trợ
    icon: "error",
    confirmButtonText: "Close",
  });
};

export const showCustomAlert = (options) => {
  return showAlert(options);
};
