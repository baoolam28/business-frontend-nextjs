import axiosClient from "./axiosClient";

const auth = {

    login(username, password){
        const url = "/api/auth/login";
        return axiosClient.post(url, {username, password});
    },

    googleSignIn(userData){
        const url = "/api/auth/google-sign-in";
        return axiosClient.post(url, userData);
    },

    user :  { 
        getInfoUser : (userId) => axiosClient.get(`/api/auth/user-info/${userId}`),
        updateInfoUser : (userId, formData) => axiosClient.put(`/api/auth/update-user/${userId}` , formData),
        updatePassUser: async (userId, fromData) => {
            return axiosClient.put(`/api/auth/change-password/${userId}`, fromData);
          }
    },
}

export default auth;