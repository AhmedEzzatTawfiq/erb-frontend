import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoiceStatus } from '../api';

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvoiceStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
