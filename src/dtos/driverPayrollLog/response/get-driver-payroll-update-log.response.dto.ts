export interface GetDriverPayrollUpdateLogResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  payrollId: number;
  type: string;
  prevData: string;
  newData: string;
  changedByUsername: string;

  createdAt: string;
}