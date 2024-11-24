import { BackendApiResponse } from "../types/global.types";
import { CoverLetter } from "../types/cover-letter.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiErrorToast, showApiSuccessToast } from "../utilities/tool";


// /**
//  * Create cover letter api
//  * @param coverLetter 
//  * @returns 
//  */
// export async function createCoverLetterApi(coverLetter: CoverLetter): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = (await axiosInstance.post('cover-letter/create', coverLetter)).data;
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }


// /**
//  * Update cover letter api
//  * @param coverLetter 
//  * @returns 
//  */
// export async function updateCoverLetterApi(coverLetter: CoverLetter): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = (await axiosInstance.patch('cover-letter/update', coverLetter)).data;
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }


// /**
//  * Get cover letter api
//  * @param id 
//  * @returns 
//  */
// export async function getCoverLetterApi(_id: CoverLetter['_id']): Promise<CoverLetter> {
//     try {
//         const resp: (BackendApiResponse & { coverLetter: CoverLetter }) = (await axiosInstance.get(`cover-letter/get/${_id}`)).data;
//         showApiSuccessToast(resp.message);
//         return resp.coverLetter;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }


/**
 * Delete cover letter api
 * @param id 
 * @returns 
 */
export async function deleteCoverLetterApi(_id: CoverLetter['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = (await axiosInstance.delete(`cover-letter/delete/${_id}`)).data;
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}


// /**
//  * Get all cover letters api
//  * @returns 
//  */
// export async function getAllCoverLettersApi(): Promise<CoverLetter[]> {
//     try {
//         const resp: (BackendApiResponse & { coverLetters: CoverLetter[] }) = (await axiosInstance.get('cover-letter/get-all')).data;
//         return resp.coverLetters;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }