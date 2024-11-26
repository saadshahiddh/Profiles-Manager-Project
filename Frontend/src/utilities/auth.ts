import { AuthToken, AuthUser } from "../types/global.types";
import { TOKEN_LOCAL_KEY } from "./environment";
import { jwtDecode } from "jwt-decode";

/**
 * Set auth token
 * @param token 
 */
export function setAuthToken(token: AuthToken) {
    localStorage.setItem(TOKEN_LOCAL_KEY, token);
}


/**
 * Get auth token
 * @returns 
 */
export function getAuthToken(): AuthToken {
    return localStorage.getItem(TOKEN_LOCAL_KEY) || '';
}


/**
 * Get auth user
 * @returns 
 */
export function getAuthUser(): AuthUser | null {
    const token = getAuthToken();
    try {
        return jwtDecode(token) as AuthUser;
        // return JSON.parse(token);
    } catch (error) {
        return null;
    }
}


/**
 * Is logged in
 * @returns 
 */
export function isLoggedIn(): boolean {
    return !!getAuthUser();
}


/**
 * On logout user
 */
export function onLogoutUser() {
    localStorage.removeItem(TOKEN_LOCAL_KEY);
}