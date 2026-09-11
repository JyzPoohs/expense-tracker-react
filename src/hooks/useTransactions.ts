import { useEffect, useState } from "react";
import {
  deleteTransaction,
  getFilteredTransactions,
} from "@/services/transactionService";
import type { Transaction } from "@/types/transaction";
import type { TransactionFilter } from "@/types/transactionFilters";

export function useTransactions(filters: TransactionFilter) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      setLoading(true);

      const data = await getFilteredTransactions(filters);

      setTransactions(data);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  const removeTransaction = async (id: number) => {
    await deleteTransaction(id);
    await loadTransactions();
  };

  return {
    transactions,
    loading,
    loadTransactions,
    removeTransaction,
  };
}
