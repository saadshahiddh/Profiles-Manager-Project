import { BackendApiResponse } from "../types/global.types";
import { Faq } from "../types/faq.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiErrorToast, showApiSuccessToast } from "../utilities/tool";


// /**
//  * Create faq api
//  * @param faq 
//  * @returns 
//  */
// export async function createFaqApi(faq: Faq): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = (await axiosInstance.post('faq/create', faq)).data;
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
//         const resp: (BackendApiResponse & { faq: Faq }) = (await axiosInstance.patch('faq/update', faq)).data;
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
//         const resp: (BackendApiResponse & { faq: Faq }) = (await axiosInstance.get(`faq/get/${_id}`)).data;
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
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
        const resp: (BackendApiResponse) = (await axiosInstance.delete(`faq/delete/${_id}`)).data;
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        const error: BackendApiResponse = err.response.data;
        showApiErrorToast(error.message);
        throw error;
    }
}


// /**
//  * Get all faqs api
//  * @returns 
//  */
// export async function getAllFaqsApi(): Promise<Faq[]> {
//     try {
//         const resp: (BackendApiResponse & { faqs: Faq[] }) = (await axiosInstance.get('faq/get-all')).data;
//         return resp.faqs;
//     } catch (err: any) {
//         const error: BackendApiResponse = err.response.data;
//         showApiErrorToast(error.message);
//         throw error;
//     }
// }