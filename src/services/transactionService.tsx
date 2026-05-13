import api from "../api/axios";

export const getAllTransactions = async () => {
    const response = await api.get("/transactions");
    return response.data;
}

export const getTransactionById = async (id: number) => {
    const response = await api.get('/transactions/' + id);
    return response.data;
}

export const createTransaction = async (transaction: any) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
}
