import { AuthToken, BackendApiResponse } from "../types/global.types";
import { LoginData, RegisterData } from "../types/user.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";


const userBaseUrl = 'user';


/**
 * Register user api
 * @param registerData 
 * @returns 
 */
export async function registerUserApi(registerData: RegisterData): Promise<AuthToken> {
    try {
        const resp: (BackendApiResponse & { token: AuthToken }) = await axiosInstance.post(`${userBaseUrl}/register`, registerData);
        showApiSuccessToast(resp.message);
        return resp.token;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


/**
 * Login user api
 * @param loginData 
 * @returns 
 */
export async function loginUserApi(loginData: LoginData): Promise<AuthToken> {
    try {
        const resp: (BackendApiResponse & { token: AuthToken }) = await axiosInstance.post(`${userBaseUrl}/login`, loginData);
        showApiSuccessToast(resp.message);
        return resp.token;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


// /**
//  * Update user api
//  * @param user
//  * @returns
//  */
// export async function updateUserApi(user: User): Promise<User> {
//     try {
//         const resp: (BackendApiResponse & { user: User }) = await axiosInstance.patch(`${userBaseUrl}/update`, user);
//         showApiSuccessToast(resp.message);
//         return resp.user;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Get user api
//  * @param id
//  * @returns
//  */
// export async function getUserApi(_id: User['_id']): Promise<User> {
//     try {
//         const resp: (BackendApiResponse & { user: User }) = await axiosInstance.get(`${userBaseUrl}/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.user;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Delete user api
//  * @param id
//  * @returns
//  */
// export async function deleteUserApi(_id: User['_id']): Promise<boolean> {
//     try {
//         const resp: (BackendApiResponse) = await axiosInstance.delete(`${userBaseUrl}/delete/${_id}`);
//         showApiSuccessToast(resp.message);
//         return true;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Get all users api
//  * @returns
//  */
// export async function getAllUsersApi(): Promise<User[]> {
//     try {
//         const resp: (BackendApiResponse & { users: User[] }) = await axiosInstance.get(`${userBaseUrl}/get-all`);
//         return resp.users;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }
