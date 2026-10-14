import { api } from '@/lib/axios';
import { ProductsResponse, CreateProductInput, UpdateProductInput, GetProductsParams, Product } from './types';

export async function createProduct(data: CreateProductInput): Promise<Product> {
  const response = await api.post('/products', data);
  return response.data;
}

export async function uploadProductImage(productId: string, file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('productId', productId);

  const { data } = await api.post(
    `/products/${productId}/avatar`,
    formData,
  );

  return data;
}

export async function deleteProductAvatar(productId: string) {
  const response = await api.delete(`/products/${productId}/avatar`);
  return response.data;
}

export async function updateProduct({
  id,
  data,
}: {
  id: string;
  data: UpdateProductInput;
}): Promise<Product> {
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
}

export async function getProducts({
  page = 1,
  limit = 6,
  search = '',
  categoryId,
  lowStock,
  sortField,
  sortOrder,
}: GetProductsParams = {}): Promise<ProductsResponse> {
  const response = await api.get('/products', {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(categoryId && { categoryId }),
      ...(lowStock !== undefined && { lowStock }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    },
  });

  const raw = response.data;
  return {
    data: raw.products ?? raw.data ?? [],
    meta: raw.meta,
  };
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
