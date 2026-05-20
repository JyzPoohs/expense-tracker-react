import api from "../api/axios";

const TRANSACTIONS_BASE_URL = "/transactions";

export const getAllTransactions = async (id: number) => {
    const response = await api.get(TRANSACTIONS_BASE_URL + "/all/" + id);
    return response.data;
}

export const getTransactionById = async (id: number) => {
    const response = await api.get(TRANSACTIONS_BASE_URL + "/" + id);
    return response.data;
}

export const createTransaction = async (transaction: any) => {
    const response = await api.post(TRANSACTIONS_BASE_URL, transaction);
    return response.data;
}
