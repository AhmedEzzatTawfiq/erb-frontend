import { api } from "@/lib/axios";
import { CreateUserInput, GetUsersParams, User, UsersResponse } from "./types";

export async function createUser(data: CreateUserInput) {
  const response = await api.post('/users', data);
  return response.data;
}

export async function updateUser({
  id,
  data,
}: {
  id: string;
  data: CreateUserInput;
}) {
  const response = await api.put(`/users/${id}`, data).catch(() => api.patch(`/users/${id}`, data));
  return response.data;
}

export async function getUsers(
  { page = 1, limit = 6, search = '', sortField, sortOrder }: GetUsersParams = {}
): Promise<UsersResponse> {
  const response = await api.get('/users', {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    },
  });
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}