import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";
import { UseUsersParams } from "../types";

export function useUsers({
  page,
  limit,
  search = '',
  sortField,
  sortOrder,
}: UseUsersParams = {}) {
  return useQuery({
    queryKey: ['users', page, limit, search, sortField, sortOrder],
    queryFn: () => getUsers({ page, limit, search, sortField, sortOrder }),
  });
}