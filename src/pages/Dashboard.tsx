import { columns } from "@/types/transaction";
import { DataTable } from "@/components/layouts/DataTable";
import { SummaryCard } from "@/components/sumamry/SummaryCard";
import { summaryCardConfig } from "@/config/SummaryCardsConfig";
import { CreateTransactionForm } from "../components/transaction/CreateTransactionDialog";
import type { DashboardSummary } from "@/types/dashboardSummary";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardBarChart from "@/components/dashboard/DashboardBarChart";
import DashboardPieChart from "@/components/dashboard/DashboardPieChart";

export const Dashboard = () => {
  const { summary, transactions, refreshDashboard } = useDashboard();

  return (
    <div>
      <div className="flex my-5">
        <h1>Dashboard</h1>
        <div className="ml-auto">
          <CreateTransactionForm onSuccess={refreshDashboard} />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <DashboardBarChart />
        <DashboardPieChart />
      </div>
      <div>
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
};
