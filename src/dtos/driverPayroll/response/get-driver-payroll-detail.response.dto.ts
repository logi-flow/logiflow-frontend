import type { DriverPayrollStatus } from "../../../enums/driver-payroll-status.enum";
import type { AllowanceItemDto } from "./allowance-item.dto";
import type { DeductionItemDto } from "./deduction-item.dto";

export interface GetDriverPayrollDetailResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  title?: string;
  periodStartDate: string;
  periodEndDate: string;
  totalAllowance: number;
  totalDeduction: number;
  finalAmount: number;
  status: DriverPayrollStatus;
  allowanceItems: AllowanceItemDto[];
  deductionItems: DeductionItemDto[];

  createdAt: string;
  updatedAt: string;
}