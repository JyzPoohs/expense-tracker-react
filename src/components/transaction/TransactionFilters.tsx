import { SelectComponent } from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { transactionTypes } from "@/config/TransactionType";
import { monthOptions } from "@/config/MonthOptionsConfig";
import { SelectGroupComponent } from "@/components/common/SelectGroupComponent";

import type { TransactionFiltersProps } from "@/types/transactionFilters";

export const TransactionFilters = ({
  filters,
  setFilters,
  categories,
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
        value={String(filters.month)}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, month: Number(value) }));
        }}
      />
      <SelectComponent
        label="Year"
        items={yearOptions}
        value={String(filters.year)}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, year: Number(value) }));
        }}
      />
      <Button className="bg-amber-700" onClick={handleReset}>
        Clear Filter
      </Button>
    </>
  );
};
