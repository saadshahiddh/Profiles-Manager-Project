import { BackendApiResponse } from "../types/global.types";
import { Profile, ProfileDetail, ProfileFormData } from "../types/profile.types";
import { User } from "../types/user.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";


// /**
//  * Create profile api
//  * @param profile 
//  * @returns 
//  */
// export async function createProfileApi(profile: Profile): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.post('profile/create', profile);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


// /**
//  * Update profile api
//  * @param profile 
//  * @returns 
//  */
// export async function updateProfileApi(profile: Profile): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.patch('profile/update', profile);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


// /**
//  * Get profile api
//  * @param id 
//  * @returns 
//  */
// export async function getProfileApi(_id: Profile['_id']): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.get(`profile/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


/**
 * Delete profile api
 * @param id 
 * @returns 
 */
export async function deleteProfileApi(_id: Profile['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`profile/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


// /**
//  * Get all profiles api
//  * @returns 
//  */
// export async function getAllProfilesApi(): Promise<Profile[]> {
//     try {
//         const resp: (BackendApiResponse & { profiles: Profile[] }) = await axiosInstance.get('profile/get-all');
//         return resp.profiles;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


/**
 * Get profile details by user api
 * @returns 
 */
export async function getProfileDetailsByUserApi(): Promise<ProfileDetail[]> {
    try {
        const resp: (BackendApiResponse & { profileDetails: ProfileDetail[] }) = await axiosInstance.get('profile/get-details-by-user');
        return resp.profileDetails;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        console.log(err);
        throw error;
    }
}



/**
 * Get profile formData api
 * @param id 
 * @returns 
 */
export async function getProfileFormDataApi(_id: Profile['_id']): Promise<ProfileFormData> {
    try {
        const resp: (BackendApiResponse & { profileFormData: ProfileFormData }) = await axiosInstance.get(`profile/get-form-data/${_id}`);
        return resp.profileFormData;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}



/**
 * Save profile formData api
 * @param id 
 * @returns 
 */
export async function saveProfileFormDataApi(profileFormData: ProfileFormData): Promise<ProfileFormData> {
    try {
        const resp: (BackendApiResponse & { profileFormData: ProfileFormData }) = await axiosInstance.patch('profile/save-form-data', profileFormData);
        showApiSuccessToast(resp.message);
        return resp.profileFormData;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}