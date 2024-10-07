import axiosClient from "./axiosClient";

const auth = {

    login(username, password){
        const url = "/api/auth/login";
        return axiosClient.post(url, {username, password});
    }
}

export default auth;