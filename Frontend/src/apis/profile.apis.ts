import { BackendApiResponse } from "../types/global.types";
import { Profile, ProfileDetail, ProfileFormData } from "../types/profile.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";


const profileBaseUrl = 'profile';


// /**
//  * Create profile api
//  * @param profile 
//  * @returns 
//  */
// export async function createProfileApi(profile: Profile): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.post(`${profileBaseUrl}/create`, profile);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Update profile api
//  * @param profile 
//  * @returns 
//  */
// export async function updateProfileApi(profile: Profile): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.patch(`${profileBaseUrl}/update`, profile);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Get profile api
//  * @param id 
//  * @returns 
//  */
// export async function getProfileApi(_id: Profile['_id']): Promise<Profile> {
//     try {
//         const resp: (BackendApiResponse & { profile: Profile }) = await axiosInstance.get(`${profileBaseUrl}/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.profile;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


/**
 * Delete profile api
 * @param id 
 * @returns 
 */
export async function deleteProfileApi(_id: Profile['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`${profileBaseUrl}/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


/**
 * Get all profiles api
 * @returns 
 */
export async function getAllProfilesApi(): Promise<Profile[]> {
    try {
        const resp: (BackendApiResponse & { profiles: Profile[] }) = await axiosInstance.get(`${profileBaseUrl}/get-all`);
        return resp.profiles;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


/**
 * Get profile details by user api
 * @returns 
 */
export async function getProfileDetailsByUserApi(): Promise<ProfileDetail[]> {
    try {
        const resp: (BackendApiResponse & { profileDetails: ProfileDetail[] }) = await axiosInstance.get(`${profileBaseUrl}/get-details-by-user`);
        return resp.profileDetails;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}



/**
 * Get profile form data api
 * @param id 
 * @returns 
 */
export async function getProfileFormDataApi(_id: Profile['_id']): Promise<ProfileFormData> {
    try {
        const resp: (BackendApiResponse & { profileFormData: ProfileFormData }) = await axiosInstance.get(`${profileBaseUrl}/get-form-data/${_id}`);
        return resp.profileFormData;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}



/**
 * Save profile form data api
 * @param id 
 * @returns 
 */
export async function saveProfileFormDataApi(profileFormData: ProfileFormData): Promise<ProfileFormData> {
    try {
        const resp: (BackendApiResponse & { profileFormData: ProfileFormData }) = await axiosInstance.patch(`${profileBaseUrl}/save-form-data`, profileFormData);
        showApiSuccessToast(resp.message);
        return resp.profileFormData;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}