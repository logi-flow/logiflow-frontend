import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";

export interface GetDriverPayrollStatusLogResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  payrollId: number;
  prevData: DriverPayrollStatus;
  newData: DriverPayrollStatus;
  changedByUsername: string;
  changeReason: string;

  createdAt: string;
}