import { columns, type TransactionType } from "@/types/transaction";
import { DataTable } from "@/components/layouts/DataTable";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services/transactionService";

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions(1);
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};
