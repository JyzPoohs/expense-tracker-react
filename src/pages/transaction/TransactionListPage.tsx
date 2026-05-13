import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionService";

export const TransactionListPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transaction List</h1>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction: any, index: number) => (
          <div key={transaction.id ?? index}>
            <p>Description: {transaction.description}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};
