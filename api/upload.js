import axiosClient from "./axiosClient";
const baseUrl = "/api/images";
const image = {
  uploadImage: (data) => axiosClient.post(`${baseUrl}/upload`,data)
}

export default image;
