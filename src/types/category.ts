export interface Category {
  id: number;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string;
  icon: string;
  isActive: boolean;
  isSystem: boolean;
}