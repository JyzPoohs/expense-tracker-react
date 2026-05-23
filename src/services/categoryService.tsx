import api from "../api/axios";

const CATEGORY_BASE_URL = "/categories";

export const getAllCategorires = async (id: number) => {
    const response = await api.get(CATEGORY_BASE_URL + "/" + id);
    return response.data;
}