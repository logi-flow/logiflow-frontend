import type { Department } from "../../../enums/employee-department.enum";
import type { Position } from "../../../enums/employee-position.enum";

export interface CreateEmployeeRequestDto {
  name: string;
  identityNumber: string;
  phoneNumber: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail?: string;
  department: Department;
  position: Position;
  companyJoin: string;
}