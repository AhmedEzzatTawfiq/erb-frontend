import { useQuery } from '@tanstack/react-query';
import { getSupplier } from '../api';

export function useSupplier(id: string) {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: () => getSupplier(id),
    enabled: !!id,
  });
}
