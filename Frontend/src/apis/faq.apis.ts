import { BackendApiResponse } from "../types/global.types";
import { Faq } from "../types/faq.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";
import { Profile } from "../types/profile.types";


// /**
//  * Create faq api
//  * @param faq 
//  * @returns 
//  */
// export async function createFaqApi(faq: Faq): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.post('faq/create', faq);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


// /**
//  * Update faq api
//  * @param faq 
//  * @returns 
//  */
// export async function updateFaqApi(faq: Faq): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.patch('faq/update', faq);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


// /**
//  * Get faq api
//  * @param id 
//  * @returns 
//  */
// export async function getFaqApi(_id: Faq['_id']): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.get(`faq/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


/**
 * Delete faq api
 * @param id 
 * @returns 
 */
export async function deleteFaqApi(_id: Faq['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`faq/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}


// /**
//  * Get all faqs api
//  * @returns
//  */
// export async function getAllFaqsApi(): Promise<Faq[]> {
//     try {
//         const resp: (BackendApiResponse & { faqs: Faq[] }) = await axiosInstance.get('faq/get-all');
//         return resp.faqs;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         throw error;
//     }
// }


/**
 * Get faqs by profile
 * @returns
 */
export async function getFaqsByProfile(profileId: Profile['_id']): Promise<Faq[]> {
    try {
        const resp: (BackendApiResponse & { faqs: Faq[] }) = await axiosInstance.get('faq/get-by-profile/' + profileId);
        return resp.faqs;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        throw error;
    }
}