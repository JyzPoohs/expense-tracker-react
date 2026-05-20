import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionService";
import { Badge } from "@/components/ui/badge";

export const TransactionListPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions(1);
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-center my-3">Transaction List</h1>
      <div className="flex w-full flex-wrap justify-center gap-2 my-3">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction: any, index: number) => (
          <div key={transaction.id ?? index} className="card mb-3 p-3 border rounded">
            <p>Note: {transaction.note}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category}</p>
            <p>Date: {transaction.date}</p>
            <p>Remarks: {transaction.remarks}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};
