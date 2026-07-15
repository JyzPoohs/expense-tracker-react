import { getAllCategorires } from "@/services/categoryService";
import type { Category } from "@/types/category";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategorires();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
  };
};
