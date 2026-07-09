import { useEffect, useMemo, useState } from "react";
import {
  deleteTransaction,
  getAllTransactions,
  getFilteredTransactions,
} from "../../services/transactionService";
import { getAllCategorires } from "../../services/categoryService";
import type { Transaction } from "@/types/transaction";
import type { Category } from "@/types/category";
import { CreateTransactionForm } from "../../components/transaction/CreateTransactionDialog";
import { SelectComponent } from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { transactionTypes } from "@/config/TransactionType";
import { toast } from "sonner";
import { monthOptions } from "@/config/MonthOptionsConfig";
import { SelectGroupComponent } from "@/components/common/SelectGroupComponent";
import { TransactionCard } from "@/components/transaction/TransactionCard";

export const TransactionListPage = () => {
  const now = new Date();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
  });

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    value: String(now.getFullYear() - index),
    label: String(now.getFullYear() - index),
  }));

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

  const categoryGroups = Object.entries(
    categories.reduce(
      (groups, category) => {
        const type = category.type.toUpperCase();
        if (!groups[type]) {
          groups[type] = [];
        }

        groups[type].push({
          value: category.name,
          label: category.name,
        });

        return groups;
      },
      {} as Record<string, { value: string; label: string }[]>,
    ),
  ).map(([label, items]) => ({
    label,
    items,
  }));

  function formatDate(date: string): string {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  }

  const handleSearch = async () => {
    await loadTransactions();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");

      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error("Delete failed:", error);
    }
  };

  const loadTransactions = async () => {
    const data = await getFilteredTransactions({
      ...filters,
      month: filters.month ? Number(filters.month) : now.getMonth() + 1,
      year: filters.year ? Number(filters.year) : now.getFullYear(),
    });
    setTransactions(data);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
    loadTransactions();
  }, [filters]);

  return (
    <div className="p-3">
      <h1 className="text-center my-3">Transaction List</h1>
      <div className="flex gap-2">
        <p className="my-auto">Filter: </p>
        <SelectComponent
          label="Type"
          items={transactionTypes}
          value={filters.type}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, type: value }));
          }}
        />
        <SelectGroupComponent
          groups={categoryGroups}
          value={filters.category}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, category: value }));
          }}
          placeholder="Category"
        />
        <SelectComponent
          label="Month"
          items={monthOptions}
          value={filters.month}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, month: value }));
          }}
        />
        <SelectComponent
          label="Year"
          items={yearOptions}
          value={filters.year}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, year: value }));
          }}
        />
        <Button
          className="bg-amber-700"
          onClick={() => {
            setFilters({
              type: "",
              category: "",
              month: String(now.getMonth() + 1),
              year: String(now.getFullYear()),
            });
            handleSearch();
          }}
        >
          Clear Filter
        </Button>
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
