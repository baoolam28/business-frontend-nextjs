import axiosClient from "./axiosClient";

const report = {
    getOrderReports(){
        const url = "/orders/reports";
        return axiosClient.get(url);
    }
}

export default report