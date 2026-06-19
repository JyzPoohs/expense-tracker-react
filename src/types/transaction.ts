import type { ColumnDef } from "@tanstack/react-table";

export interface Transaction {
  id: number;
  userId: number;
  note: string;
  amount: number;
  date: string;
  category: string;
  type: string;
  remarks: string;
}

export interface TransactionFormData {
  note: string;
  amount: number;
  type: string;
  category: string;
  remarks: string;
  date: Date;
}

export type TransactionType = {
  id: number;
  note: string;
  amount: number;
  date: string;
  category: string;
  type: string;
  remarks: string;
};

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
