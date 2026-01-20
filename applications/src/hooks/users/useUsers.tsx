import { useState, useMemo, useEffect } from "react";
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

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t =
      localStorage.getItem("token") ||
      localStorage.getItem("access_token");
    setToken(t);
  }, []);

  const usersQuery = useQuery({
    queryKey: ["users", filters, sortBy, sortOrder, token],
    queryFn: () =>
      UserServices.getUsers({
        ...filters,
        sortBy,
        sortOrder,
      }),
    enabled: !!token,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const createUser = useMutation({
    mutationFn: (payload: Partial<User>) =>
      UserServices.createUser(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUser = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
      UserServices.updateUser(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => UserServices.deleteUser(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    data: usersQuery.data?.data ?? [],
    meta: usersQuery.data?.meta ?? { page: 1, limit: 10, count: 0 },
    filters,
    setFilters,
    loading: usersQuery.isLoading,
    refetch: usersQuery.refetch,

    createUser: createUser.mutateAsync,
    createLoading: createUser.isLoading,
    updateUser: updateUser.mutateAsync,
    updateLoading: updateUser.isLoading,
    deleteUser: deleteUser.mutateAsync,
    deleteLoading: deleteUser.isLoading,
  };
};
