import axios from "axios";

export const useAuthService = () => {
    const baseUrl = process.env.REACT_APP_API_URL;

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
    const register = async (username, password, email) => {
        return axios.post(`${baseUrl}/api/Account/Register`, { username, password, email })
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