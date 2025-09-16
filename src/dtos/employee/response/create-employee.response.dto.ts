import type { Department } from "../../../enums/employee-department.enum";
import type { Position } from "../../../enums/employee-position.enum";
import type { EmployeeStatus } from "../../../enums/employee-status.enum";

export interface CreateEmployeeResponseDto {
  id?: number;
  userId: number;
  username: string;
  name: string;
  status: EmployeeStatus;
  identityNumberMasked: string;
  phoneNumber: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail?: string;
  department: Department;
  position: Position;
  companyJoin: string;
  createdAt: string;
  updatedAt: string;
}