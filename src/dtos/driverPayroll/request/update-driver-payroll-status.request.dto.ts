import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";

export interface UpdateDriverPayrollStatusRequestDto {
  status: DriverPayrollStatus;
  changeReason: string;
}