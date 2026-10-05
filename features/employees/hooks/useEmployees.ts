import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../api';
import { UseEmployeesParams } from '../types';

export function useEmployees({
  page,
  limit,
  search = '',
  departmentId,
  status,
  sortField,
  sortOrder,
}: UseEmployeesParams = {}) {
  return useQuery({
    queryKey: ['employees', page, limit, search, departmentId, status, sortField, sortOrder],
    queryFn: () => getEmployees({ page, limit, search, departmentId, status, sortField, sortOrder }),
  });
}
