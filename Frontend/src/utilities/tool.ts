import { toast } from "react-toastify";
import { API_BASE_URL } from "./environment";


/**
 * Show api success toast
 * @param message 
 */
export function showApiSuccessToast(message: string) {
    toast.success(message, { closeButton: false, pauseOnHover: false, hideProgressBar: true, autoClose: 2000 });
}


/**
 * Show api error toast
 * @param message 
 */
export function showApiErrorToast(message: string) {
    toast.error(message, {});
}


/**
 * Get file path
 * @param fileName 
 * @returns 
 */
export function getFilePath(fileName: string | undefined) {
    return `${API_BASE_URL}file/${fileName}`;
}


/**
 * Format to medium date
 * @param date 
 * @returns 
 */
export function formatDateToMediumDate(date: undefined | string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date || ''));
}