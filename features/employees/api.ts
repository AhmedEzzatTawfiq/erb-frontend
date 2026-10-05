import { api } from '@/lib/axios';
import { EmployeesResponse, CreateEmployeeInput, GetEmployeesParams, Employee } from './types';

export async function createEmployee(data: CreateEmployeeInput) {
  const response = await api.post('/employees', data);
  return response.data;
}

export async function updateEmployee({
  id,
  data,
}: {
  id: string;
  data: CreateEmployeeInput;
}) {
  const response = await api.put(`/employees/${id}`, data).catch(() => api.patch(`/employees/${id}`, data));
  return response.data;
}

export async function getEmployees({
  page = 1,
  limit = 6,
  search = '',
  departmentId,
  status,
  sortField,
  sortOrder,
}: GetEmployeesParams = {}): Promise<EmployeesResponse> {
  const response = await api.get('/employees', {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(departmentId && { departmentId }),
      ...(status && { status }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    },
  });

  return response.data;
}

export async function getEmployee(id: string): Promise<Employee> {
  const response = await api.get(`/employees/${id}`);
  return response.data;
}

export async function deleteEmployee(id: string): Promise<void> {
  await api.delete(`/employees/${id}`);
}