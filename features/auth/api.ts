import { api } from "@/lib/axios";
import { AuthResponse, LoginPayload, RefreshResponse, RegisterPayload, User } from "./types";



export const register = async (
    payload: RegisterPayload
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        "/auth/register",
        payload
    );

    return response.data;
};


export const login = async (
    payload: LoginPayload
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        payload
    );

    return response.data;
};


export const refreshToken = async (): Promise<RefreshResponse> => {
    const response = await api.post<RefreshResponse>(
        "/auth/refresh"
    );

    return response.data;
};

export const getProfile = async (): Promise<User> => {
    const response = await api.get<User>("/auth/profile");

    return response.data;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};

export const logoutAll = async () => {
    const response = await api.post("/auth/logout-all");

    return response.data;
};





// will remove it
export const getUser = async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);

    return response.data;
};