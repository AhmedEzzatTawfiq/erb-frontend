import { useQuery } from '@tanstack/react-query';
import { getEmployee } from '../api';

export function useEmployee(id: string) {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getEmployee(id),
    enabled: !!id,
  });
}
