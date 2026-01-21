import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryServices } from "../../services/categoryService";
import type { Category, GetCategoriesParams } from "../../types/category";

export const useCategories = (initialFilters?: GetCategoriesParams) => {
  const queryClient = useQueryClient();

  /* ===================== MEMO FILTER ===================== */
  const memoFilters = useMemo(
    () => initialFilters,
    [
      initialFilters?.page,
      initialFilters?.limit,
      initialFilters?.search,
      initialFilters?.start_date,
      initialFilters?.end_date,
    ]
  );

  /* ===================== FILTER STATE ===================== */
  const [filters, setFilters] = useState<GetCategoriesParams>({
    page: 1,
    limit: 10,
    search: "",
    ...memoFilters,
  });

  /* ===================== SAFE SYNC ===================== */
  useEffect(() => {
    if (!memoFilters) return;

    setFilters((prev) => {
      const next = { ...prev, ...memoFilters };

      // 🔒 cegah update kalau tidak ada perubahan
      const isSame =
        prev.page === next.page &&
        prev.limit === next.limit &&
        prev.search === next.search &&
        prev.start_date === next.start_date &&
        prev.end_date === next.end_date;

      return isSame ? prev : next;
    });
  }, [memoFilters]);

  /* ===================== SORT ===================== */
  const [sortBy, setSortBy] = useState<keyof Category>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (column: keyof Category) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  /* ===================== QUERY ===================== */
  const categoriesQuery = useQuery({
    queryKey: ["categories", filters, sortBy, sortOrder],
    queryFn: () =>
      CategoryServices.getCategories({
        ...filters,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  /* ===================== MUTATION ===================== */
  const createCategory = useMutation({
    mutationFn: (payload: Partial<Category>) =>
      CategoryServices.createCategory(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Category> }) =>
      CategoryServices.updateCategory(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => CategoryServices.deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  /* ===================== STATE ===================== */
  const loading =
    categoriesQuery.isLoading ||
    createCategory.isLoading ||
    updateCategory.isLoading ||
    deleteCategory.isLoading;

  const data = categoriesQuery.data?.data ?? [];
  const meta = categoriesQuery.data?.meta ?? {
    page: 1,
    limit: 10,
    count: 0,
  };

  const pages = useMemo(
    () => Math.max(1, Math.ceil(meta.count / meta.limit)),
    [meta.count, meta.limit]
  );

  /* ===================== RETURN ===================== */
  return {
    data,
    meta,
    pages,
    filters,
    setFilters,
    sortBy,
    sortOrder,
    handleSort,
    loading,
    error: categoriesQuery.error ?? null,
    refetch: categoriesQuery.refetch,

    createCategory: createCategory.mutateAsync,
    createLoading: createCategory.isLoading,
    updateCategory: updateCategory.mutateAsync,
    updateLoading: updateCategory.isLoading,
    deleteCategory: deleteCategory.mutateAsync,
    deleteLoading: deleteCategory.isLoading,
  };
};
