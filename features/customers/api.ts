import { api } from '@/lib/axios';
import { CustomersResponse, CreateCustomerInput, GetCustomerParams } from './types';


export async function createCustomer(
  data: CreateCustomerInput
) {
  const response = await api.post('/customers', data);

  return response.data;
}

export async function uploadCustomerImage(customerId: string, file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('customerId', customerId);

  const { data } = await api.post(
    `/customers/${customerId}/avatar`,
    formData,
  );

  return data;
}

export async function deleteCustomerAvatar(customerId: string) {
  const response = await api.delete(`/customers/${customerId}/avatar`);
  return response.data;
}


export async function updateCustomer(
  {
    id,
    data
  }: { id: string, data: CreateCustomerInput }
) {
  const response = await api.patch(`/customers/${id}`, data)

  return response.data;

}


export async function getCustomers(
  { page = 1, limit = 4, search = '', sortField, sortOrder }: GetCustomerParams = {}
): Promise<CustomersResponse> {
  const response = await api.get('/customers', {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    }
  });

  return response.data;
}

export async function getCustomer(id: string) {
  const response = await api.get(`/customers/${id}`);

  return response.data;
}


export async function deleteCustomer(id: string): Promise<void> {
  await api.delete(`/customers/${id}`);
}