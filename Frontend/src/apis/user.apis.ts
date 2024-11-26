import { AuthToken, BackendApiResponse } from "../types/global.types";
import { User } from "../types/user.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";


/**
 * Register user api
 * @param user 
 * @returns 
 */
export async function registerUserApi(user: User): Promise<AuthToken> {
    try {
        const resp: (BackendApiResponse & { token: AuthToken }) = await axiosInstance.post('user/register', user);
        showApiSuccessToast(resp.message);
        return resp.token;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


/**
 * Update user api
 * @param user 
 * @returns 
 */
export async function updateUserApi(user: User): Promise<User> {
    try {
        const resp: (BackendApiResponse & { user: User }) = await axiosInstance.patch('user/update', user);
        showApiSuccessToast(resp.message);
        return resp.user;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


/**
 * Get user api
 * @param id 
 * @returns 
 */
export async function getUserApi(_id: User['_id']): Promise<User> {
    try {
        const resp: (BackendApiResponse & { user: User }) = await axiosInstance.get(`user/get/${_id}`);
        showApiSuccessToast(resp.message);
        return resp.user;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


/**
 * Delete user api
 * @param id 
 * @returns 
 */
export async function deleteUserApi(_id: User['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`user/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


/**
 * Get all users api
 * @returns 
 */
export async function getAllUsersApi(): Promise<User[]> {
    try {
        const resp: (BackendApiResponse & { users: User[] }) = await axiosInstance.get('user/get-all');
        return resp.users;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}
