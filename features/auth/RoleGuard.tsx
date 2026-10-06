import { ReactNode } from "react";
import { hasRole } from "@/lib/permissions";
import { UserRole } from "./types";
import { useAuth } from "./AuthProvider";

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}

export function RoleGuard({
    children,
    allowedRoles
}: RoleGuardProps) {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return null;
    }

    if (!hasRole(user.role, allowedRoles)) {
        return null;
    }
    return <>{children}</>;
}