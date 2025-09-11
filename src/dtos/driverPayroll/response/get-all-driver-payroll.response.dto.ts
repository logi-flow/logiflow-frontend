import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";

export interface GetAllDriverPayrollResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  title?: string;
  totalAllowance: number;
  totalDeduction: number;
  finalAmount: number;
  status: DriverPayrollStatus;

  createdAt: string;
  updatedAt: string;
}