import api from "../api/axios";

const AUTH_BASE_URL = "/auth";

export const initializeUser = async () => {
    const response = await api.post(`${AUTH_BASE_URL}/me`);
    return response.data;
}