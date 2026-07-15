import { useEffect, useMemo, useState } from "react";
import { getAllCategorires } from "../../services/categoryService";
import type { Transaction } from "@/types/transaction";
import type { Category } from "@/types/category";
import { CreateTransactionForm } from "../../components/transaction/CreateTransactionDialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TransactionCard } from "@/components/transaction/TransactionCard";
import { TransactionFilters } from "@/components/transaction/TransactionFilters";
import { formatDate } from "@/utils/date";
import { useTransactions } from "@/hooks/useTransactions";

export const TransactionListPage = () => {
  const now = new Date();
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const { transactions, loading, refresh, removeTransaction } =
    useTransactions(filters);

  const [categories, setCategories] = useState<Category[]>([]);

  const groupedTransactions = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return sorted.reduce(
      (groups, transaction) => {
        const date = formatDate(transaction.date);

        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(transaction);

        return groups;
      },
      {} as Record<string, Transaction[]>,
    );
  }, [transactions]);

  const handleReset = () => {
    setFilters({
      type: "",
      category: "",
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
    refresh();
  };

  const handleDelete = async (id: number) => {
    try {
      await removeTransaction(id);
      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
  }, [filters]);

  return (
    <div className="p-3">
      <h1 className="text-center my-3">Transaction List</h1>
      <div className="flex gap-2">
        <p className="my-auto">Filter: </p>
        <TransactionFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          handleReset={handleReset}
        />
        <div className="ml-auto">
          <CreateTransactionForm />
        </div>
      </div>
      {Object.entries(groupedTransactions).length > 0 ? (
        Object.entries(groupedTransactions).map(([date, items]) => (
          <div key={date} className="mt-2">
            <h3>{formatDate(date)}</h3>
            {items.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                handleDelete={handleDelete}
              />
            ))}
            <Separator />
          </div>
        ))
      ) : (
        <div className="text-center mt-5 text-lg text-muted-foreground">
          No transactions found
        </div>
      )}
    </div>
  );
};
