import { toast } from "react-toastify";


/**
 * Present toast
 * @param message 
 * @param type 
 */
export function presentToast(message: string, type?: 'success' | 'warning' | 'error') {
    const toastConfig = { closeButton: false, pauseOnHover: false, hideProgressBar: true };
    switch (type) {
        case 'success':
            toast.success(message, toastConfig);
            break;
        case 'warning':
            toast.warning(message, toastConfig);
            break;
        case 'error':
            toast.error(message, toastConfig);
            break;
        default:
            toast.info(message, toastConfig);
            break;
    }
}


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