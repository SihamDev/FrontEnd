import axios from "axios";

const api = axios.create({
    baseURL: "https://api.vapi.ai/",
});

// Request interceptor to include the token in headers
api.interceptors.request.use((config) => {
    try {
        // const token = localStorage.getItem("token");
        const token = "42839938-5d08-4337-8f9c-b36624f6dab0";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        console.log(error);
    }
});

export default api;
