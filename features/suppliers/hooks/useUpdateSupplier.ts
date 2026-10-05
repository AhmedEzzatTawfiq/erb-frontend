import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSupplier } from '../api';

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });
    },
  });
}
