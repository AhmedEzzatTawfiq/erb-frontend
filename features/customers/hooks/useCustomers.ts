import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../../customers/api';
import { UseCustomerParams } from '../types';


export function useCustomers({ page, limit, search = '', sortField, sortOrder }: UseCustomerParams) {
  return useQuery({
    queryKey: ['customers', page, limit, search, sortField, sortOrder],
    queryFn: () => getCustomers({ page, limit, search, sortField, sortOrder }),
  });
}