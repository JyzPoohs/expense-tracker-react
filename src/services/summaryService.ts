import api from "../api/axios";

const SUMMARY_BASE_URL = "/summary";

export const getDashboardSummary = async () => {
  const response = await api.get(SUMMARY_BASE_URL + '/dashboard');
  return response.data;
};
