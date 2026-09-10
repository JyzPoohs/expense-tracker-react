import api from "../api/axios";

const CATEGORY_BASE_URL = "/categories";

export const getAllCategorires = async () => {
    const response = await api.get(CATEGORY_BASE_URL);
    return response.data;
}