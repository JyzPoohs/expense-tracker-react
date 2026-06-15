import { columns, type TransactionType } from "@/types/transaction";
import { DataTable } from "@/components/layouts/DataTable";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services/transactionService";
import { useAuth } from "@/auth/AuthProvider";
import { SummaryCard } from "@/components/sumamry/SummaryCard";
import { summaryCards } from "@/config/SummaryCardsConfig";
import { CreateTransactionForm } from "./transaction/CreateTransactionForm";

export const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();

        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [ isAuthenticated, user]);

  return (
    <div>
      <div className="flex my-5">
        <h1>Dashboard</h1>
        <div className="ml-auto">
          <CreateTransactionForm />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-5">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        xxx
        <div>
          <DataTable columns={columns} data={transactions} />
        </div>
      </div>
    </div>
  );
};
