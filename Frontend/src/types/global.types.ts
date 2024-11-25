export interface BackendApiResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
}

export type AuthToken = string;

export interface AuthUser {
    name: string;
    email: string;
};