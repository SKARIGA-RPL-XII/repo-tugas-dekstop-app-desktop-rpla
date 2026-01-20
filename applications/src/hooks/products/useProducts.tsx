import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductServices } from "../../services/productService";
import type { Product, GetProductsParams } from "../../types/product";

export const useProducts = (initialFilters?: GetProductsParams) => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<GetProductsParams>({
    page: 1,
    limit: 10,
    search: "",
    ...initialFilters,
  });

  const [sortBy, setSortBy] = useState<keyof Product>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (column: keyof Product) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const productsQuery = useQuery({
    queryKey: ["products", filters, sortBy, sortOrder],
    queryFn: () =>
      ProductServices.getProducts({
        ...filters,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const createProduct = useMutation({
    mutationFn: (payload: Partial<Product>) =>
      ProductServices.createProduct(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateProduct = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Product>;
    }) => ProductServices.updateProduct(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => ProductServices.deleteProduct(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const loading =
    productsQuery.isLoading ||
    createProduct.isLoading ||
    updateProduct.isLoading ||
    deleteProduct.isLoading;

  const data = productsQuery.data?.data ?? [];
  const meta = productsQuery.data?.meta ?? {
    page: 1,
    limit: 10,
    count: 0,
  };

  const pages = useMemo(
    () => Math.max(1, Math.ceil(meta.count / meta.limit)),
    [meta.count, meta.limit]
  );

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
    error: productsQuery.error ?? null,
    refetch: productsQuery.refetch,

    createProduct: createProduct.mutateAsync,
    createLoading: createProduct.isLoading,
    updateProduct: updateProduct.mutateAsync,
    updateLoading: updateProduct.isLoading,
    deleteProduct: deleteProduct.mutateAsync,
    deleteLoading: deleteProduct.isLoading,
  };
};
