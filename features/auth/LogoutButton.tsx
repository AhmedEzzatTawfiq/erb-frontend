"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}