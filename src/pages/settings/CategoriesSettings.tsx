import { getAllCategorires } from "@/services/categoryService";
import type { Category } from "@/types/category";
import { iconMap } from "@/utils/iconMapper";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

export const CategoriesSettings = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategorires();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <div>
      <div>
        <Label>Expense Categories:</Label>
        {categories && categories.length > 0 && (
          <div className="flex justify-start flex-wrap gap-2 my-3">
            {categories
              .filter((category) => category.type === "EXPENSE")
              .map((category: Category, index: number) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Badge
                    key={index}
                    style={{
                      backgroundColor: category.color,
                    }}
                    className="text-white flex items-center gap-1 h-7"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}

                    {category.name}
                  </Badge>
                );
              })}
          </div>
        )}
      </div>
      <div>
        <Label>Income Categories:</Label>
        {categories && categories.length > 0 && (
          <div className="flex justify-start flex-wrap gap-2 my-3">
            {categories
              .filter((category) => category.type === "INCOME")
              .map((category: Category, index: number) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <Badge
                    key={index}
                    style={{
                      backgroundColor: category.color,
                    }}
                    className="text-white flex items-center gap-1 h-7"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}

                    {category.name}
                  </Badge>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
