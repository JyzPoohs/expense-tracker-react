import api from "../api/axios";

const CHART_BASE_URL = "/chart";

export const getDashboardBarChartData = async () => {
    const response = await api.get(`${CHART_BASE_URL}/dashboard/barchart`);
    return response.data;
}