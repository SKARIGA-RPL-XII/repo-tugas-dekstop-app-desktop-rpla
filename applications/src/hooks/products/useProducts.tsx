import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductServices } from "../../services/productService";
import type { Product, GetProductsParams } from "../../types/product";
import { CategoryServices } from "../../services/categoryService";



export const useProducts = () => {
  const queryClient = useQueryClient();
  

  const [filters, setFilters] = useState<GetProductsParams>({
    page: 1,
    limit: 10,
    search: "",
    category_id: "",
    is_active: "",
    min_price: "",
    max_price: "",
    min_stock: "",
    max_stock: "",
    start_date: "",
    end_date: "",
  });


  const setFilterField = (key: keyof GetProductsParams, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, 
    }));
  };

  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search, page: 1 }));

  const productsQuery = useQuery({
    queryKey: ["products", filters],
    queryFn: () => ProductServices.getProducts(filters),
    keepPreviousData: true,
  });

  const createProduct = useMutation({
    mutationFn: (payload: FormData) =>
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
      payload: FormData;
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
    page: filters.page ?? 1,
    limit: filters.limit ?? 10,
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
    loading,
    error: productsQuery.error ?? null,
    refetch: productsQuery.refetch,

    filters,
    setFilters,
    setFilterField,
    setSearch,

    createProduct: createProduct.mutateAsync,
    updateProduct: updateProduct.mutateAsync,
    deleteProduct: deleteProduct.mutateAsync,
  };
};
