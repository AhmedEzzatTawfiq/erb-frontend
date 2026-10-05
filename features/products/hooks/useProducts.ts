import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import { UseProductsParams } from '../types';

export function useProducts({
  page,
  limit,
  search = '',
  categoryId,
  lowStock,
  sortField,
  sortOrder,
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ['products', page, limit, search, categoryId, lowStock, sortField, sortOrder],
    queryFn: () => getProducts({ page, limit, search, categoryId, lowStock, sortField, sortOrder }),
  });
}
