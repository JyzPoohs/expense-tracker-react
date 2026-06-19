import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Category } from "@/types/category";
import { getAllCategorires } from "@/services/categoryService";
import { createTransaction } from "@/services/transactionService";
import { toast } from "sonner";
import type { TransactionFormData } from "@/types/transaction";
import { TransactionForm } from "./TransactionForm";

export const CreateTransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    note: "",
    amount: 0,
    type: "",
    category: "",
    remarks: "",
    date: new Date(),
  });

  const handleCreate = async (data: TransactionFormData) => {
    await createTransaction(data);

    toast.success("Transaction created");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-amber-1000">
        <DialogHeader className="text-center">
          <DialogTitle>Create Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm categories={categories} onSubmit={handleCreate} />
      </DialogContent>
    </Dialog>
  );
};
