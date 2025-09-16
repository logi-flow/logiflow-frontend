import type { Department } from "../../../enums/employee-department.enum";
import type { Position } from "../../../enums/employee-position.enum";
import type { EmployeeStatus } from "../../../enums/employee-status.enum";

export interface GetAllEmployeeResponseDto {
  id?: number;
  userId: number;
  name: string;
  status: EmployeeStatus;
  department: Department;
  position: Position;
  companyJoin: string;
  createdAt: string;
  updatedAt: string;
}