import type { LucideIcon } from "lucide-react";

export interface AlertDialogProps {
  title: string;
  message: string;
  icon: LucideIcon;
  triggerClassName?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}