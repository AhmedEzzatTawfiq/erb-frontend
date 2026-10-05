import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "../api";

export function useUpdateCustomers() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateCustomer,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['customers'],
            })
        }
    })
}