import { useQuery } from '@tanstack/react-query';
import { getSuppliers } from '../api';
import { UseSuppliersParams } from '../types';

export function useSuppliers({
  page,
  limit,
  search = '',
  status,
  sortField,
  sortOrder,
}: UseSuppliersParams = {}) {
  return useQuery({
    queryKey: ['suppliers', page, limit, search, status, sortField, sortOrder],
    queryFn: () => getSuppliers({ page, limit, search, status, sortField, sortOrder }),
  });
}
