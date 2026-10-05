import axios from "axios";
import { clearAuth, getAccessToken, setAccessToken } from "./auth";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
},
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {},
                {withCredentials: true}
            )

            const {accessToken} = refreshResponse.data;

            setAccessToken(accessToken)

            originalRequest.headers.Authorization = `Bearer ${accessToken}`

            return api(originalRequest)

        } catch (refreshError) {
            clearAuth();

            return Promise.reject(refreshError);
        }
    }
)