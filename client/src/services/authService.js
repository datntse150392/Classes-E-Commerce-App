import axios from "axios";

export const useAuthService = () => {
    const baseUrl = "http://visionup.somee.com";

    // Login
    const login = async (username, password) => {
        return axios.post(`${baseUrl}/api/Account/Login`, { username, password })
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    console.log('No item found in response');
                    return null;
                }
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    };

    // Register
    const register = async (username, password) => {
        return axios.post(`${baseUrl}/api/Account/Register`, { username, password })
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    console.log('No item found in response');
                    return null;
                }
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    };

    return { login, register };
};