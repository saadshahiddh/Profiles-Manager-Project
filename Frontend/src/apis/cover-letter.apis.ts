import { BackendApiResponse } from "../types/global.types";
import { CoverLetter } from "../types/cover-letter.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";
import { Profile } from "../types/profile.types";

const coverLetterBaseUrl = 'cover-letter'


// /**
//  * Create cover letter api
//  * @param coverLetter 
//  * @returns 
//  */
// export async function createCoverLetterApi(coverLetter: CoverLetter): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = await axiosInstance.post(`${coverLetterBaseUrl}/create`, coverLetter);
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Update cover letter api
//  * @param coverLetter 
//  * @returns 
//  */
// export async function updateCoverLetterApi(coverLetter: CoverLetter): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = await axiosInstance.patch(`${coverLetterBaseUrl}/update`, coverLetter);
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Get cover letter api
//  * @param id 
//  * @returns 
//  */
// export async function getCoverLetterApi(_id: CoverLetter['_id']): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = await axiosInstance.get(`${coverLetterBaseUrl}/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


/**
 * Delete cover letter api
 * @param id 
 * @returns 
 */
export async function deleteCoverLetterApi(_id: CoverLetter['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`cover-letter/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


// /**
//  * Get all cover letters api
//  * @returns
//  */
// export async function getAllCoverLettersApi(): Promise<CoverLetter[]> {
//     try {
//         const resp: (BackendApiResponse & { coverLetters: CoverLetter[] }) = await axiosInstance.get(`${coverLetterBaseUrl}/get-all`);
//         return resp.coverLetters;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }



/**
 * Get cover letters by profile
 * @returns
 */
export async function getCoverLettersByProfile(profileId: Profile['_id']): Promise<CoverLetter[]> {
    try {
        const resp: (BackendApiResponse & { coverLetters: CoverLetter[] }) = await axiosInstance.get(`${coverLetterBaseUrl}/get-by-profile/` + profileId);
        return resp.coverLetters;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}