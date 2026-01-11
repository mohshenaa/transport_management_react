import axios from "axios";

const API_URL = "https://localhost:7131/api"; // your API base URL

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Add JWT token to all requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
