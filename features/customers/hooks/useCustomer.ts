import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '../../customers/api';


export function useCustomer(id: string) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
  });
}