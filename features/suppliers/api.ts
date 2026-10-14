import { api } from '@/lib/axios';
import { SuppliersResponse, CreateSupplierInput, GetSuppliersParams, Supplier } from './types';

export async function createSupplier(data: CreateSupplierInput): Promise<Supplier> {
  const response = await api.post('/suppliers', data);
  return response.data;
}

export async function uploadSupplierImage(supplierId: string, file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('supplierId', supplierId);

  const { data } = await api.post(
    `/suppliers/${supplierId}/avatar`,
    formData,
  );

  return data;
}

export async function deleteSupplierAvatar(supplierId: string) {
  const response = await api.delete(`/suppliers/${supplierId}/avatar`);
  return response.data;
}

export async function updateSupplier({
  id,
  data,
}: {
  id: string;
  data: CreateSupplierInput;
}): Promise<Supplier> {
  const response = await api.patch(`/suppliers/${id}`, data).catch(() => api.put(`/suppliers/${id}`, data));
  return response.data;
}

export async function getSuppliers({
  page = 1,
  limit = 6,
  search = '',
  status,
  sortField,
  sortOrder,
}: GetSuppliersParams = {}): Promise<SuppliersResponse> {
  const response = await api.get('/suppliers', {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(status && { status }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    },
  });

  return response.data;
}

export async function getSupplier(id: string): Promise<Supplier> {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
}

export async function deleteSupplier(id: string): Promise<void> {
  await api.delete(`/suppliers/${id}`);
}
