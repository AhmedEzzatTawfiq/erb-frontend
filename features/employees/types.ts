export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

export type Department =
  | 'Engineering'
  | 'Sales'
  | 'Finance'
  | 'Human Resources'
  | 'Marketing'
  | 'Operations'
  | 'Design'
  | 'Legal';

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  department: Department;
  position: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  avatar?: string;
  initials?: string;
  initialsBg?: string;
  joinedDate: string;
}
