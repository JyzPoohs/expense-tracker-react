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
