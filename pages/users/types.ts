export type UserRole = 'Admin' | 'Editor' | 'Viewer' | 'Manager';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

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
