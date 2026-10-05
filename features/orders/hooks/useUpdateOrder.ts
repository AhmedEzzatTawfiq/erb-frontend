import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../api';

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
