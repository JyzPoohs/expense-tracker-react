import { useEffect, useState } from "react";
import {
  deleteTransaction,
  getAllTransactions,
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
import { transactionTypes } from "@/config/transactionType";
import { toast } from "sonner";
import { EditTransactionDialog } from "@/components/transaction/EditTransactionDialog";
import { monthOptions } from "@/config/MonthOptionsConfig";

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

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const groupedTransactions = sortedTransactions.reduce(
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

  function formatDate(date: string): string {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  }

  const handleDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete this transaction?")) {
        await deleteTransaction(id);
        toast.success("Transaction deleted successfully");
      }

      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
    };

    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
    fetchTransactions();
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
        <SelectComponent
          label="Category"
          items={categories.map((cat) => cat.name)}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <SelectComponent
          label="Month"
          items={monthOptions.map((month) => month.label)}
          value={
            monthOptions.find((m) => m.value === selectedMonth)?.label ?? ""
          }
          onChange={(label) => {
            const month = monthOptions.find((m) => m.label === label);
            setSelectedMonth(month?.value ?? "");
          }}
        />

        <SelectComponent
          label="Year"
          items={yearOptions.map((year) => year.label)}
          value={selectedYear}
          onChange={setSelectedYear}
        />
        <Button className="bg-amber-500">Search</Button>
        <Button
          className="bg-amber-700"
          onClick={() => {
            setSelectedType("");
            setSelectedCategory("");
            setSelectedMonth(String(now.getMonth() + 1));
            setSelectedYear(String(now.getFullYear()));
          }}
        >
          Clear Filter
        </Button>
        <div className="ml-auto">
          <CreateTransactionForm />
        </div>
      </div>
      {Object.entries(groupedTransactions).map(([date, items]) => (
        <div key={date} className="mt-2">
          <h3>{formatDate(date)}</h3>

          {items.map((transaction) => (
            <>
              <div key={transaction.id} className="card mb-3 p-3 flex gap-4">
                <span className="rounded-full bg-amber-300 w-10 h-10 flex items-center justify-center">
                  <Car />
                </span>
                <div>
                  <p>{transaction.note}</p>
                  <p className="text-sm text-muted-foreground">
                    Remarks: {transaction.remarks}
                  </p>
                </div>

                <p className="ml-auto">{`${transaction.type == "INCOME" ? `+ ${transaction.amount}` : `- ${transaction.amount}`}`}</p>
                <ViewTransactionInfo transaction={transaction} />
                <EditTransactionDialog transaction={transaction} />
                <Button
                  type="button"
                  className="bg-red-500"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash />
                </Button>
              </div>
              <Separator />
            </>
          ))}
        </div>
      ))}
    </div>
  );
};
