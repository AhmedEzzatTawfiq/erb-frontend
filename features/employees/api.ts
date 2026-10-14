import { api } from '@/lib/axios';
import { EmployeesResponse, CreateEmployeeInput, GetEmployeesParams, Employee, CreateEmployeeResponse } from './types';

export async function createEmployee(data: CreateEmployeeInput): Promise<CreateEmployeeResponse> {
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
  const response = await api.put(`/employees/${id}`, data);
  return response.data;
}

export async function uploadEmployeeImage(employeeId: string, file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('employeeId', employeeId);

  const { data } = await api.post(
    `/employees/${employeeId}/avatar`,
    formData,
  );

  return data;
}

export async function deleteEmployeeAvatar(employeeId: string) {
  const response = await api.delete(`/employees/${employeeId}/avatar`);
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