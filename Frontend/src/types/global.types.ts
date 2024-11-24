export interface BackendApiResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
}

export interface LoginData {
    email: string;
    password: string;
}

export type AuthToken = string;

export interface AuthUser {
    name: string;
    email: string;
};