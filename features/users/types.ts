export type UserRole = 'admin' | 'manager' | 'employee';

export type UserStatus = 'active' | 'inactive';

export type UserRoleFilter = 'All Roles' | UserRole;

export type UserStatusFilter = 'All Statuses' | UserStatus;

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
  status?: UserStatus;
  role?: UserRole;
  avatar?: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
  role?: UserRole;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
  role?: UserRole;
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
