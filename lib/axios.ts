import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import {
    clearAccessToken,
    getAccessToken,
    setAccessToken,
    notifyAuthExpired
} from "./auth";

interface retryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface RefreshSubscriber {
    resolve: (accessToken: string) => void;
    reject: (error: unknown) => void;
}





export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers: {
    //     "Content-Type": "application/json",   
    // },
    withCredentials: true,
});


api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }
);



// --------------------------------------------------
// Refresh Token State
// --------------------------------------------------

let isRefreshing = false;

let refreshSubscribers: RefreshSubscriber[] = [];

const subscribeToRefresh = (
    resolve: (accessToken: string) => void,
    reject: (error: unknown) => void
) => {
    refreshSubscribers.push({
        resolve,
        reject,
    });
};

const notifyRefreshSubscribers = (
    accessToken: string
) => {
    refreshSubscribers.forEach(({ resolve }) => {
        resolve(accessToken);
    });
    refreshSubscribers = [];
};

const notifyRefreshSubscribersError = (error: unknown) => {
    refreshSubscribers.forEach(({ reject }) => {
        reject(error);
    });
    refreshSubscribers = [];
};


// --------------------------------------------------
// Response Interceptor
// --------------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest =
            error.config as retryableRequestConfig | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest
        ) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            clearAccessToken();

            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // ----------------------------------------------
        // Another request is already refreshing
        // ----------------------------------------------

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeToRefresh(
                    (accessToken: string) => {
                        originalRequest.headers.Authorization =
                            `Bearer ${accessToken}`;

                        resolve(api(originalRequest));
                    },
                    reject
                );
            });
        }

        // ----------------------------------------------
        // Start refresh
        // ----------------------------------------------

        isRefreshing = true;

        try {
            const response = await axios.post<{
                success: boolean;
                accessToken: string;
            }>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                {},
                {
                    withCredentials: true,
                }
            );

            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);
            notifyRefreshSubscribers(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            clearAccessToken();
            notifyRefreshSubscribersError(refreshError);
            notifyAuthExpired();

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }

    }
);


// Refresh

export const refreshClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
