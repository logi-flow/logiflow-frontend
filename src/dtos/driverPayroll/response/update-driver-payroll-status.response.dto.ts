import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";

export interface UpdateDriverPayrollStatusResponseDto {
  id: number;
  driverId: number;
  title?: string;
  periodStartDate: string;
  periodEndDate: string;
  totalAllowance: number;
  totalDeduction: number;
  finalAmount: number;
  status: DriverPayrollStatus;
  changeReason: string;

  createdAt: string;
  updatedAt: string;
}