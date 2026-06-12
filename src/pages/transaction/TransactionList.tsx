import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionService";
import { getAllCategorires } from "../../services/categoryService";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/utils/iconMapper";
import type { Transaction } from "@/types/transaction";
import type { Category } from "@/types/category";
import { CreateTransactionForm } from "./CreateTransactionForm";
import { SelectComponent } from "@/components/component/SelectComponent";
import { transactionTypes } from "@/config/TransactionType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Car } from "lucide-react";

export const TransactionListPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
        <Button className="bg-amber-500">Search</Button>
        <Button
          className="bg-amber-700"
          onClick={() => {
            setSelectedType("");
            setSelectedCategory("");
          }}
        >
          Clear Filter
        </Button>
        <div className="ml-auto">
          <CreateTransactionForm />
        </div>
      </div>
      {/* {categories && categories.length > 0 && (
        <div className="flex justify-center flex-wrap gap-2 my-3">
          {categories.map((category: Category, index: number) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Badge
                key={index}
                style={{
                  backgroundColor: category.color,
                }}
                className="text-white flex items-center gap-1 h-7"
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}

                {category.name}
              </Badge>
            );
          })}
        </div>
      )} */}
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction: Transaction, index: number) => (
          <>
            <div
              key={transaction.id ?? index}
              className="card mb-3 p-3 flex gap-4"
            >
              <span className="rounded-full bg-amber-300 w-10 h-10 flex items-center justify-center">
                <Car />
              </span>
              <div>
                <p>{transaction.note}</p>
                <p className="text-sm text-muted-foreground">Remarks: {transaction.remarks}</p>
              </div>

              <p className="ml-auto">{`${transaction.type == "INCOME" ? `+ ${transaction.amount}` : `- ${transaction.amount}`}`}</p>
              {/* <p>Note: {transaction.note}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Type: {transaction.type}</p>
              <p>Category: {transaction.category}</p>
              <p>Date: {transaction.date}</p>
              <p>Remarks: {transaction.remarks}</p> */}
            </div>
            <Separator className="bg-amber-100" />
          </>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};
