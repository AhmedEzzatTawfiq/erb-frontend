export type EmployeeStatus = 'active' | 'inactive' | 'Terminated';

export type Department = string;

export interface Employee {
  id: string;
  employeeId?: string;
  name: string;
  department?: Department | { id: string; name: string };
  departmentId?: string;
  position?: string;
  jobTitle?: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  salary?: number;
  status: EmployeeStatus;
  avatar?: string | null;
  initials?: string;
  initialsBg?: string;
  joinedDate?: string;
  hireDate?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateEmployeeResponse = Employee;

export interface CreateEmployeeInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  department?: string;
  departmentId?: string;
  position?: string;
  jobTitle?: string;
  hireDate?: string;
  joinedDate?: string;
  salary?: number;
  status?: EmployeeStatus | string;
  employeeId?: string;
  avatar?: string;
}

export interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  departmentId?: string;
  status?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  departmentId?: string;
  status?: string;
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

export interface EmployeesResponse {
  data: Employee[];
  meta: PaginationMeta;
}





