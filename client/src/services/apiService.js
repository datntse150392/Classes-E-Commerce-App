import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

export const getSomeData = async () => {
  try {
    const response = await api.get("/some-endpoint");
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
