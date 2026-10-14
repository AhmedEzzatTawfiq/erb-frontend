import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSupplierImage, deleteSupplierAvatar } from "../api";

type UploadAvatarVariables = {
  supplierId: string;
  file: File;
};

export function useUploadSupplierAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ supplierId, file }: UploadAvatarVariables) =>
      uploadSupplierImage(supplierId, file),

    onSuccess: (_data, { supplierId }) => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["suppliers", supplierId],
      });
    },
  });
}

export function useDeleteSupplierAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierId: string) => deleteSupplierAvatar(supplierId),
    onSuccess: (_data, supplierId) => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
      if (supplierId) {
        queryClient.invalidateQueries({
          queryKey: ["suppliers", supplierId],
        });
      }
    },
  });
}

