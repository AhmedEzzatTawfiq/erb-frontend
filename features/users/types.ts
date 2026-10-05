export type UserRole = 'Admin' | 'Manager' | 'Employee';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created: string;
  avatar?: string;
  initials?: string;
  initialsBg?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password?: string;
  role?: UserRole | string;
  status?: UserStatus | string;
  avatar?: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount?: number;
  total?: number;
  totalPages: number;
}

export interface UsersResponse {
  data: User[];
  meta: PaginationMeta;
}
