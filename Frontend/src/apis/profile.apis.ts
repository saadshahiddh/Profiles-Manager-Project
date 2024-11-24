import { BackendApiResponse } from "../types/global.types";
import { Profile, ProfileDetail } from "../types/profile.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiErrorToast, showApiSuccessToast } from "../utilities/tool";


// /**
//  * Create profile api
//  * @param profile 
//  * @returns 
//  */
// export async function createProfileApi(profile: Profile): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = (await axiosInstance.post('profile/create', profile)).data;
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
//         const resp: (BackendApiResponse & { profile: Profile }) = (await axiosInstance.patch('profile/update', profile)).data;
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
//         const resp: (BackendApiResponse & { profile: Profile }) = (await axiosInstance.get(`profile/get/${_id}`)).data;
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
        const resp: (BackendApiResponse) = (await axiosInstance.delete(`profile/delete/${_id}`)).data;
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}


// /**
//  * Get all profiles api
//  * @returns 
//  */
// export async function getAllProfilesApi(): Promise<Profile[]> {
//     try {
//         const resp: (BackendApiResponse & { profiles: Profile[] }) = (await axiosInstance.get('profile/get-all')).data;
//         return resp.profiles;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }


/**
 * Get all profile details api
 * @returns 
 */
export async function getAllProfileDetailsApi(): Promise<ProfileDetail[]> {
    try {
        const resp: (BackendApiResponse & { profileDetails: ProfileDetail[] }) = (await axiosInstance.get('profile/get-all-details')).data;
        return resp.profileDetails;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}



/**
 * Get profile detail api
 * @param id 
 * @returns 
 */
export async function getProfileDetailApi(_id: Profile['_id']): Promise<ProfileDetail> {
    try {
        const resp: (BackendApiResponse & { profileDetail: ProfileDetail }) = (await axiosInstance.get(`profile/get-detail/${_id}`)).data;
        return resp.profileDetail;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}



/**
 * Save profile detail api
 * @param id 
 * @returns 
 */
export async function saveProfileDetailApi(profileDetail: ProfileDetail): Promise<ProfileDetail> {
    try {
        const resp: (BackendApiResponse & { profileDetail: ProfileDetail }) = (await axiosInstance.patch('profile/save-detail', profileDetail)).data;
        showApiSuccessToast(resp.message);
        return resp.profileDetail;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}