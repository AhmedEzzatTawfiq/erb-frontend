export type ProductCategory =
  | 'Networking'
  | 'Hardware'
  | 'Storage'
  | 'Peripherals'
  | 'Electronics'
  | string;

export type ProductStockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | string;

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  category?: { id: string; name: string } | string;
  unitPrice: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  // UI helper fields
  price?: number;
  stock?: number;
  stockStatus?: ProductStockStatus;
  image?: string | null;
  description?: string | null;
  initials?: string;
  initialsBg?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  categoryId: string;
  unitPrice: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
}

export interface UpdateProductInput {
  name?: string;
  sku?: string;
  categoryId?: string;
  unitPrice?: number;
  costPrice?: number;
  reorderLevel?: number;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  lowStock?: boolean;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  lowStock?: boolean;
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

export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}
