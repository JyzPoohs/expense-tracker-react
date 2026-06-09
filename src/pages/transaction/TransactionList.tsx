import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/transactionService";
import { getAllCategorires } from "../../services/categoryService";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/utils/iconMapper";
import type { Transaction } from "@/types/transaction";
import type { Category } from "@/types/category";

export const TransactionListPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions(1);
      setTransactions(data);
    };

    const fetchCategories = async () => {
      const data = await getAllCategorires(1);
      setCategories(data);
    };

    fetchCategories();
    fetchTransactions();
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-center my-3">Transaction List</h1>
      {categories && categories.length > 0 && (
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
      )}
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction: Transaction, index: number) => (
          <div
            key={transaction.id ?? index}
            className="card mb-3 p-3 border rounded"
          >
            <p>Note: {transaction.note}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category}</p>
            <p>Date: {transaction.date}</p>
            <p>Remarks: {transaction.remarks}</p>
          </div>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};
