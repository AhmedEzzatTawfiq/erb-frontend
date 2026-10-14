import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadEmployeeImage, deleteEmployeeAvatar } from "../api";

type UploadAvatarVariables = {
  employeeId: string;
  file: File;
};

export function useUploadEmployeeAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ employeeId, file }: UploadAvatarVariables) =>
      uploadEmployeeImage(employeeId, file),

    onSuccess: (_data, { employeeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employees", employeeId],
      });
    },
  });
}

export function useDeleteEmployeeAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeId: string) => deleteEmployeeAvatar(employeeId),
    onSuccess: (_data, employeeId) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      if (employeeId) {
        queryClient.invalidateQueries({
          queryKey: ["employees", employeeId],
        });
      }
    },
  });
}

