import { UserRole } from "@/features/auth/types";

export function hasRole(
    userRole: UserRole,
    allowedRoles: UserRole[]
): boolean {
    if (!userRole) return false;

    return allowedRoles.includes(userRole);
}


export const permissions = {
  users: {
    view: ["admin", "manager"],
    create: ["admin"],
    edit: ["admin"],
    delete: ["admin"],
  },

  employees: {
    view: ["admin", "manager"],
    create: ["admin", "manager"],
    edit: ["admin", "manager"],
    delete: ["admin"],
  },

  customers: {
    view: ["admin", "manager", "employee"],
    create: ["admin", "manager"],
    edit: ["admin", "manager"],
    delete: ["admin", "manager"],
  },
} satisfies Record<
  string,
  Record<string, UserRole[]>
>;