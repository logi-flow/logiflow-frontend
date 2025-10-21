import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";

export interface GetDriverPayrollStatusLogResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  payrollId: number;
  prevStatus: DriverPayrollStatus;
  newStatus: DriverPayrollStatus;
  changedByUsername: string;
  changeReason: string;

  createdAt: string;
}