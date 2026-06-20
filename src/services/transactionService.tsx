import type { TransactionFormData } from "@/types/transaction";
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

export const createTransaction = async (transaction: TransactionFormData) => {
    const response = await api.post(TRANSACTIONS_BASE_URL, transaction);
    return response.data;
}

export const updateTransaction = async (id: number, transaction: TransactionFormData) => {
    const response = await api.put(TRANSACTIONS_BASE_URL + "/" + id, transaction);
    return response.data;
}

export const deleteTransaction = async (id: number) => {
    const response = await api.delete(TRANSACTIONS_BASE_URL + "/" + id);
    return response.data;
}
