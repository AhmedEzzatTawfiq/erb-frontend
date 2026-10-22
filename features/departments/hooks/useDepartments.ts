import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDepartments, createDepartment } from '../api';

export function useDepartments() {
    return useQuery({
        queryKey: ['departments'],
        queryFn: () => getDepartments(),
    });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
    },
  });
}