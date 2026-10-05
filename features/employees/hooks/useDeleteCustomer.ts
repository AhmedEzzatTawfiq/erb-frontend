import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../../customers/api";

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCustomer,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['customers']
            })
        }
    })
}