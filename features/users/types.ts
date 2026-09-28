export type UserRole = 'Admin' | 'Manager' | 'Employee';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created: string;
  avatar?: string;
  initials?: string;
  initialsBg?: string;
}
