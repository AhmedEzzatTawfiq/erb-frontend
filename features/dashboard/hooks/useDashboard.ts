import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview } from '../api';

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: getDashboardOverview,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
