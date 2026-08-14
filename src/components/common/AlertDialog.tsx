import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AlertDialogProps } from "@/types/alertDialog";

import { Button } from "@/components/ui/button";

export const AlertDialog = ({
  title,
  message,
  icon: Icon,
  triggerClassName,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: AlertDialogProps) => {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <Button className={triggerClassName}>
          <Icon /> 
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
