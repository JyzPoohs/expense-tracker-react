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
import { Car, Trash } from "lucide-react";
import { ViewTransactionInfo } from "../../components/transaction/ViewTransactionDialog";
import { transactionTypes } from "@/config/TransactionType";
import { toast } from "sonner";
import { EditTransactionDialog } from "@/components/transaction/EditTransactionDialog";
import { monthOptions } from "@/config/MonthOptionsConfig";
import { AlertDialog } from "@/components/common/AlertDialog";
import { deleteAlertDialog } from "@/config/AlertDialogConfig";
import { SelectGroupComponent } from "@/components/common/SelectGroupComponent";
import { TransactionCard } from "@/components/transaction/TransactionCard";

export const TransactionListPage = () => {
  const now = new Date();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    String(now.getMonth() + 1),
  );

  const [selectedYear, setSelectedYear] = useState(String(now.getFullYear()));
  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    value: String(currentYear - index),
    label: String(currentYear - index),
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
      type: selectedType,
      category: selectedCategory,
      month: Number.parseInt(selectedMonth),
      year: Number.parseInt(selectedYear),
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
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-center my-3">Transaction List</h1>
      <div className="flex gap-2">
        <p className="my-auto">Filter: </p>
        <SelectComponent
          label="Type"
          items={transactionTypes}
          value={selectedType}
          onChange={setSelectedType}
        />
        <SelectGroupComponent
          groups={categoryGroups}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Category"
        />
        <SelectComponent
          label="Month"
          items={monthOptions}
          value={selectedMonth}
          onChange={setSelectedMonth}
        />
        <SelectComponent
          label="Year"
          items={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
        />
        <Button className="bg-amber-500" onClick={handleSearch}>
          Search
        </Button>
        <Button
          className="bg-amber-700"
          onClick={() => {
            setSelectedType("");
            setSelectedCategory("");
            setSelectedMonth(String(now.getMonth() + 1));
            setSelectedYear(String(now.getFullYear()));
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
                handleDelete={handleDelete}/>
            ))}
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
