import axiosClient from "./axiosClient";

const auth = {

    login(username, password){
        const url = "/api/auth/login";
        return axiosClient.post(url, {username, password});
    },

    googleSignIn(userData){
        const url = "/api/auth/google-sign-in";
        return axiosClient.post(url, userData);
    }
}

export default auth;