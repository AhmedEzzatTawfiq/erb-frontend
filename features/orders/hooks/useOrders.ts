import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api';
import { GetOrdersParams } from '../types';

export function useOrders({
  page,
  limit,
  search = '',
  status,
  customerId,
  from,
  to,
}: GetOrdersParams = {}) {
  return useQuery({
    queryKey: ['orders', page, limit, search, status, customerId, from, to],
    queryFn: () => getOrders({ page, limit, search, status, customerId, from, to }),
  });
}
