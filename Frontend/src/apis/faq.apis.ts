import { BackendApiResponse } from "../types/global.types";
import { Faq } from "../types/faq.types";
import axiosInstance from "../utilities/axios-instance";
import { showApiSuccessToast } from "../utilities/tool";
import { Profile } from "../types/profile.types";


const faqsBaseUrl = 'faq';


// /**
//  * Create faq api
//  * @param faq 
//  * @returns 
//  */
// export async function createFaqApi(faq: Faq): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.post(`${faqsBaseUrl}/create`, faq);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Update faq api
//  * @param faq 
//  * @returns 
//  */
// export async function updateFaqApi(faq: Faq): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.patch(`${faqsBaseUrl}/update`, faq);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


// /**
//  * Get faq api
//  * @param id 
//  * @returns 
//  */
// export async function getFaqApi(_id: Faq['_id']): Promise<Faq> {
//     try {
//         const resp: (BackendApiResponse & { faq: Faq }) = await axiosInstance.get(`${faqsBaseUrl}/get/${_id}`);
//         showApiSuccessToast(resp.message);
//         return resp.faq;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


/**
 * Delete faq api
 * @param id 
 * @returns 
 */
export async function deleteFaqApi(_id: Faq['_id']): Promise<boolean> {
    try {
        const resp: (BackendApiResponse) = await axiosInstance.delete(`${faqsBaseUrl}/delete/${_id}`);
        showApiSuccessToast(resp.message);
        return true;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}


// /**
//  * Get all faqs api
//  * @returns
//  */
// export async function getAllFaqsApi(): Promise<Faq[]> {
//     try {
//         const resp: (BackendApiResponse & { faqs: Faq[] }) = await axiosInstance.get(`${faqsBaseUrl}/get-all`);
//         return resp.faqs;
//     } catch (err: any) {
//         throw (err.response.data as BackendApiResponse);
//     }
// }


/**
 * Get faqs by profile
 * @returns
 */
export async function getFaqsByProfile(profileId: Profile['_id']): Promise<Faq[]> {
    try {
        const resp: (BackendApiResponse & { faqs: Faq[] }) = await axiosInstance.get(`${faqsBaseUrl}/get-by-profile/` + profileId);
        return resp.faqs;
    } catch (err: any) {
        throw (err.response.data as BackendApiResponse);
    }
}