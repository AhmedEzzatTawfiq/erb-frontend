import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUserImage, deleteUserAvatar } from "../api";

type UploadAvatarVariables = {
  userId: string;
  file: File;
};

export function useUploadUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, file }: UploadAvatarVariables) =>
      uploadUserImage(userId, file),

    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users", userId],
      });
    },
  });
}

export function useDeleteUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserAvatar(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["users", userId],
        });
      }
    },
  });
}

