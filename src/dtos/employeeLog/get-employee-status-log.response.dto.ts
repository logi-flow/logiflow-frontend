import type { EmployeeStatus } from "../../enums/employee-status.enum";

export interface GetEmployeeStatusLogResponseDto {
  id?: number;
  employeeId?: number
  username: string;
  changedReason: string;
  prevStatus: EmployeeStatus;
  newStatus: EmployeeStatus;
  createdAt: string;
}