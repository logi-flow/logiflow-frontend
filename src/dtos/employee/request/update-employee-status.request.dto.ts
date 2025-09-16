import type { EmployeeStatus } from "../../../enums/employee-status.enum";

export interface UpdateEmployeeStatusRequestDto {
  status: EmployeeStatus;
  changedReason: string;
}