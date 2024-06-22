import axios from "axios";

export const useDashboardService = () => {
    const baseUrl = process.env.REACT_APP_API_URL;

    const getAllAccount = async () => {
        return axios.get(`${baseUrl}/api/Account?PageSize=1000`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllOrder = async () => {
        return axios.get(`${baseUrl}/api/Order?PageSize=1000`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllOrderDetail = async () => {
        return axios.get(`${baseUrl}/api/OrderDetail`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllPayment = async () => {
        return axios.get(`${baseUrl}/api/Payment`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllProfile = async () => {
        return axios.get(`${baseUrl}/api/Profile`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllOrderPageSize1000 = async () => {
        return axios.get(`${baseUrl}/api/Order?PageSize=1000`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    return { getAllAccount, getAllOrder, getAllOrderDetail, getAllPayment, getAllProfile, getAllOrderPageSize1000 };
};
