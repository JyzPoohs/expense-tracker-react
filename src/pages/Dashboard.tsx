import { columns, type TransactionType } from "@/types/transaction";
import { DataTable } from "@/components/layouts/DataTable";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services/transactionService";
import { useAuth } from "@/auth/AuthProvider";
import { SummaryCard } from "@/components/sumamry/SummaryCard";
import { summaryCards } from "@/config/SummaryCardsConfig";

export const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) {
      return;
    }

    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions(1);

        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [isLoading, isAuthenticated, user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-5">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};
