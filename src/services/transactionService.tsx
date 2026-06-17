import type { Transaction } from "@/types/transaction";
import api from "../api/axios";

const TRANSACTIONS_BASE_URL = "/transactions";

export const getAllTransactions = async () => {
    const response = await api.get(TRANSACTIONS_BASE_URL);
    return response.data;
}

export const getTransactionById = async (id: number) => {
    const response = await api.get(TRANSACTIONS_BASE_URL + "/" + id);
    return response.data;
}

export const createTransaction = async (formData: any) => {
    const response = await api.post(TRANSACTIONS_BASE_URL, formData);
    return response.data;
}

export const deleteTransaction = async (id: number) => {
    const response = await api.delete(TRANSACTIONS_BASE_URL + "/" + id);
    return response.data;
}
