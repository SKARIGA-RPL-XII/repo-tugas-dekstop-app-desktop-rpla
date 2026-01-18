import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserServices } from "../../services/userService";
import type { User, GetUsersParams } from "../../types/user";

export const useUsers = (initialFilters?: GetUsersParams) => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<GetUsersParams>({
    page: 1,
    limit: 10,
    search: "",
    ...initialFilters,
  });

  const [sortBy, setSortBy] = useState<keyof User>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token");

  const usersQuery = useQuery({
    queryKey: ["users", filters, sortBy, sortOrder],
    queryFn: () =>
      UserServices.getUsers({
        ...filters,
        sortBy,
        sortOrder,
      }),
    enabled: !!token, 
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });


  const createUser = useMutation({
    mutationFn: (payload: Partial<User>) =>
      UserServices.createUser(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUser = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<User>;
    }) => UserServices.updateUser(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => UserServices.deleteUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const loading =
    usersQuery.isLoading ||
    createUser.isLoading ||
    updateUser.isLoading ||
    deleteUser.isLoading;

  const data = usersQuery.data?.data ?? [];
  const meta = usersQuery.data?.meta ?? {
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
    error: usersQuery.error ?? null,
    refetch: usersQuery.refetch,

    createUser: createUser.mutateAsync,
    createLoading: createUser.isLoading,
    updateUser: updateUser.mutateAsync,
    updateLoading: updateUser.isLoading,
    deleteUser: deleteUser.mutateAsync,
    deleteLoading: deleteUser.isLoading,
  };
};
