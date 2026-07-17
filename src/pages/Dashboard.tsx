import { columns, type TransactionType } from "@/types/transaction";
import { DataTable } from "@/components/layouts/DataTable";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/services/transactionService";
import { useAuth } from "@/auth/AuthProvider";
import { SummaryCard } from "@/components/sumamry/SummaryCard";
import { summaryCardConfig } from "@/config/SummaryCardsConfig";
import { CreateTransactionForm } from "../components/transaction/CreateTransactionDialog";
import type { DashboardSummary } from "@/types/dashboardSummary";
import { useDashboard } from "@/hooks/useDashboard";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const { summary } = useDashboard();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();

        setTransactions(data);
      } catch (error) {
        console.error("Fetch dashboard transactions error: ", error);
      }
    };


    fetchTransactions();
  }, [isAuthenticated, user]);

  return (
    <div>
      <div className="flex my-5">
        <h1>Dashboard</h1>
        <div className="ml-auto">
          <CreateTransactionForm />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-5">
        {summary &&
          summaryCardConfig.map((card) => (
            <SummaryCard
              key={card.key}
              title={card.title}
              icon={card.icon}
              value={
                card.key === "numTransactions"
                  ? String(summary.numTransactions)
                  : `RM ${summary[card.key as keyof DashboardSummary]}`
              }
              description={
                card.key === "totalBalance"
                  ? `${summary.percentage}% from last month`
                  : undefined
              }
            />
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <ChartExample/> */}
        <div>
          <DataTable columns={columns} data={transactions} />
        </div>
      </div>
    </div>
  );
};
