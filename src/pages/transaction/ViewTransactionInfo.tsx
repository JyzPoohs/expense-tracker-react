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

export const ViewTransactionInfo = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const data = await getTransactionById(1);
      setTransaction(data);
    };

    fetchTransaction();
  }, []);
  return (
    <Dialog>
      <form>
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
            <Button type="submit" className="bg-amber-500">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
