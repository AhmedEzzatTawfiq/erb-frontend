import { api } from "@/lib/axios";
import { User } from "@/features/auth/types";
import { logoutAll as logoutAllAuth } from "@/features/auth/api";

export interface UpdateProfilePayload {
  name: string;
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<User> => {
  const response = await api.patch<User>("/users/profile", payload);
  return response.data;
};

export const logoutAllDevices = async (): Promise<void> => {
  await logoutAllAuth();
};
