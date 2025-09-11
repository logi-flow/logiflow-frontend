export interface UpdateDriverPayrollResponseDto {
  id: number;
  driverId: number;
  title?: string;
  periodStartDate: string;
  periodEndDate: string;
  totalAllowance: number;
  totalDeduction: number;
  finalAmount: number;

  createdAt: string;
  updatedAt: string;
}