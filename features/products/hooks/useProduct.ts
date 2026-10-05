import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../api';

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}
