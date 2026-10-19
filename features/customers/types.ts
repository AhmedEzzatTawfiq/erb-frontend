export type CustomerStatus = 'active' | 'inactive';

export interface CreateCustomerInput {
  companyName: string;
  contactName: string;
  email?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  status?: CustomerStatus;
  city?: string;
  country?: string;
  taxId?: string;
}

export interface GetCustomerParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CustomerStatus;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseCustomerParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CustomerStatus;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CustomerApi {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  taxId: string | null;
  avatar: string | null;
  orders: number;
  totalSpent: number;
  isDeleted: boolean;
  status?: CustomerStatus;
  initials?: string;
  initialsBg?: string;
  createdAt: string;
  updatedAt: string;
}

export type Customer = CustomerApi;

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount?: number;
  total?: number;
  totalPages: number;
}

export interface CustomersResponse {
  data: CustomerApi[];
  meta: PaginationMeta;
}
