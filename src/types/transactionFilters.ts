import type { Category } from "@/types/category";

export interface TransactionFilter {
  type: string;
  category: string;
  month: number;
  year: number;
}

export interface TransactionFiltersProps {
  filters: TransactionFilter;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string;
      category: string;
      month: number;
      year: number;
    }>
  >;
  categories: Category[];
  handleReset: () => void;
}
