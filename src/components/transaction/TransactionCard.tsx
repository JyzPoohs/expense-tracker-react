import { Car, Trash } from "lucide-react";
import { EditTransactionDialog } from "./EditTransactionDialog";
import { ViewTransactionInfo } from "./ViewTransactionDialog";
import type { TransactionCardProps } from "@/config/TransactionCardProps";
import { AlertDialog } from "@/components/common/AlertDialog";
import { deleteAlertDialog } from "@/config/AlertDialogConfig";

export const TransactionCard = ({ transaction, handleDelete }: TransactionCardProps) => {
  return (
    <>
      <div key={transaction.id}>
        <div className="card mb-3 p-3 flex gap-4">
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
          <AlertDialog
            title={deleteAlertDialog.title}
            message={deleteAlertDialog.message}
            confirmText={deleteAlertDialog.confirmText}
            cancelText={deleteAlertDialog.cancelText}
            icon={Trash}
            triggerClassName="bg-red-500"
            onConfirm={() => handleDelete(transaction.id)}
          />
        </div>
      </div>
    </>
  );
};
