import { CreateTransactionForm } from "../../components/transaction/CreateTransactionDialog";
import { SelectComponent } from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { transactionTypes } from "@/config/TransactionType";
import { monthOptions } from "@/config/MonthOptionsConfig";
import { SelectGroupComponent } from "@/components/common/SelectGroupComponent";
import type { Category } from "@/types/category";
import { useState } from "react";

interface TransactionFiltersProps {
  filters: {
    type: string;
    category: string;
    month: string;
    year: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string;
      category: string;
      month: string;
      year: string;
    }>
  >;
  categories: Category[];
  handleSearch: () => void;
  handleReset: () => void;
}

export const TransactionFilters = ({
  filters,
  setFilters,
  categories,
  handleSearch,
  handleReset,
}: TransactionFiltersProps) => {
  const now = new Date();
  const yearOptions = Array.from({ length: 10 }, (_, index) => ({
    value: String(now.getFullYear() - index),
    label: String(now.getFullYear() - index),
  }));

  const categoryGroups = Object.entries(
    categories.reduce(
      (groups, category) => {
        const type = category.type.toUpperCase();
        if (!groups[type]) {
          groups[type] = [];
        }

        groups[type].push({
          value: category.name,
          label: category.name,
        });

        return groups;
      },
      {} as Record<string, { value: string; label: string }[]>,
    ),
  ).map(([label, items]) => ({
    label,
    items,
  }));

  return (
    <>
      <SelectComponent
        label="Type"
        items={transactionTypes}
        value={filters.type}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, type: value }));
        }}
      />
      <SelectGroupComponent
        groups={categoryGroups}
        value={filters.category}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, category: value }));
        }}
        placeholder="Category"
      />
      <SelectComponent
        label="Month"
        items={monthOptions}
        value={filters.month}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, month: value }));
        }}
      />
      <SelectComponent
        label="Year"
        items={yearOptions}
        value={filters.year}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, year: value }));
        }}
      />
      <Button className="bg-amber-700" onClick={handleReset}>
        Clear Filter
      </Button>
    </>
  );
};
