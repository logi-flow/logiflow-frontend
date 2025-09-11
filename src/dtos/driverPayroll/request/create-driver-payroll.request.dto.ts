export interface CreateDriverPayrollRequestDto {
  driverId: number;
  title?: string;
  periodStartDate: string;
  periodEndDate: string;
}