import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTransaction } from "@/services/transactionService";
import { toast } from "sonner";
import type { TransactionFormData } from "@/types/transaction";
import { TransactionForm } from "./TransactionForm";

export const CreateTransactionForm = () => {
  const handleCreate = async (data: TransactionFormData) => {
    await createTransaction(data);

    toast.success("Transaction created");
  };

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
        <TransactionForm onSubmit={handleCreate} />
      </DialogContent>
    </Dialog>
  );
};
