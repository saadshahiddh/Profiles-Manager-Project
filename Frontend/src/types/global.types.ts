import { User } from "./user.types";

export interface BackendApiResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
}

export type AuthToken = string;

export interface AuthUser extends Pick<User, '_id' | 'name' | 'email'> { };