import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Category } from "@/types/category";
import { getTransactionById } from "@/services/transactionService";
import type { Transaction } from "@/types/transaction";

interface ViewTransactionInfoProps {
  transaction: Transaction;
}

export const ViewTransactionInfo = ({ transaction }: ViewTransactionInfoProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-amber-1000">
        <DialogHeader>
          <DialogTitle className="text-center">View Transaction</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-white">
          <p>Note: {transaction?.note}</p>
          <p>Amount: {transaction?.amount}</p>
          <p>Type: {transaction?.type}</p>
          <p>Category: {transaction?.category}</p>
          <p>Date: {transaction?.date}</p>
          <p>Remarks: {transaction?.remarks}</p>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-amber-500">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
