import axiosClient from "./axiosClient";

const auth = {

    login(username, password){
        const url = "/auth/login";
        return axiosClient.post(url, {username, password});
    }
}

export default auth;