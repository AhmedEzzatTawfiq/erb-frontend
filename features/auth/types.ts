export type UserRole = "admin" | "manager" | "employee";


export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}