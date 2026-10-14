import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCustomerImage, deleteCustomerAvatar } from "../api";

type UploadAvatarVariables = {
  customerId: string;
  file: File;
};

export function useUploadCustomerAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, file }: UploadAvatarVariables) =>
      uploadCustomerImage(customerId, file),

    onSuccess: (_data, { customerId }) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customers", customerId],
      });
    },
  });
}

export function useDeleteCustomerAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => deleteCustomerAvatar(customerId),
    onSuccess: (_data, customerId) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      if (customerId) {
        queryClient.invalidateQueries({
          queryKey: ["customers", customerId],
        });
      }
    },
  });
}

