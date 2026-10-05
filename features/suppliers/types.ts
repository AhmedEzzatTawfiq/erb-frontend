export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  paymentTerms?: string;
  productsSupplied?: string[];
  status?: 'Active' | 'Inactive' | 'Pending' | string;
  initials?: string;
  initialsBg?: string;
  avatar?: string | null;
  joinedDate?: string;
}

export interface CreateSupplierInput {
  companyName: string;
  contactName: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  productsSupplied?: string[];
  status?: string;
  avatar?: string;
}

export interface GetSuppliersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseSuppliersParams {
  page?: number;
  limit?: number;
  search?: string;
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

export interface SuppliersResponse {
  data: Supplier[];
  meta: PaginationMeta;
}
