import axios from "axios";

export const useEyeGlassService = () => {
    const baseUrl = "http://visionup.somee.com";

    const fetchAllEyeGlass = async () => {
        return axios.get(`${baseUrl}/api/EyeGlass`)
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

    const fetchEyeGlassById = async (id) => {
        return axios.get(`${baseUrl}/api/EyeGlass/${id}`)
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

    return { fetchAllEyeGlass, fetchEyeGlassById };
};