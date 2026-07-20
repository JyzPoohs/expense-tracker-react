import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TransactionForm } from "./TransactionForm";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { Transaction, TransactionFormData } from "@/types/transaction";
import { updateTransaction } from "@/services/transactionService";
import { useState } from "react";

export const EditTransactionDialog = ({
  transaction,
  onSuccess,
}: {
  transaction: Transaction;
  onSuccess: () => void;
}) => {
  const handleUpdate = async (data: TransactionFormData) => {
    await updateTransaction(transaction.id, data);

    toast.success("Transaction updated");

    onSuccess();
    
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-amber-1000">
        <DialogHeader className="text-center">
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          initialData={{
            note: transaction.note,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            remarks: transaction.remarks,
            date: new Date(transaction.date),
          }}
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
