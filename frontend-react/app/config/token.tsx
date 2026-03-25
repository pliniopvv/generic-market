import { jwtDecode } from "jwt-decode";

export function isValidToken(token: string) {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
}