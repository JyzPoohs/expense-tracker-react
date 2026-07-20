import type { Transaction } from "@/types/transaction";

export interface TransactionCardProps {
  transaction: Transaction;
  handleDelete: (id: number) => void;
  loadTransactions: () => void;
}