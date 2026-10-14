import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProductImage, deleteProductAvatar } from "../api";

type UploadAvatarVariables = {
  productId: string;
  file: File;
};

export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, file }: UploadAvatarVariables) =>
      uploadProductImage(productId, file),

    onSuccess: (_data, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
    },
  });
}

export function useDeleteProductAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProductAvatar(productId),
    onSuccess: (_data, productId) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      if (productId) {
        queryClient.invalidateQueries({
          queryKey: ["products", productId],
        });
      }
    },
  });
}

