import { RECORD_TOKEN, LOGOUT } from "./actionTypes";

export const recordToken = (str) => {
    return {
        type: RECORD_TOKEN,
        payload: str
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
