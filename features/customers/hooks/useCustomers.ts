import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../../customers/api';
import { UseCustomerParams } from '../types';


export function useCustomers({ page, limit, search = '', sortField, sortOrder, status }: UseCustomerParams) {
  return useQuery({
    queryKey: ['customers', page, limit, search, sortField, sortOrder, status],
    queryFn: () => getCustomers({ page, limit, search, sortField, sortOrder, status }),
  });
}