import type { CustomerStatus } from "../../../enums/customer-status.enum";
import type { EmployeeStatus } from "../../../enums/employee-status.enum";

export interface UpdateEmployeeStatusResponseDto {
  id?: number;
  status: EmployeeStatus;
  changedBy: string;
  changedByUsername: string;
  changedReason: string;
  prevStatus: EmployeeStatus;
  newStatus: EmployeeStatus;
  createdAt: string;
  updatedAt: string;
}