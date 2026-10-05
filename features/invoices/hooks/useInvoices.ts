import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../api';
import { GetInvoicesParams } from '../types';

export function useInvoices({
  page,
  limit,
  search = '',
  status,
  customerId,
  from,
  to,
}: GetInvoicesParams = {}) {
  return useQuery({
    queryKey: ['invoices', page, limit, search, status, customerId, from, to],
    queryFn: () => getInvoices({ page, limit, search, status, customerId, from, to }),
  });
}
