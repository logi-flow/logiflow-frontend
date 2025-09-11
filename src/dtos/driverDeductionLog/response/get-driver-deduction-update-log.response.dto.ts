export interface GetDriverDeductionUpdateLogResponseDto {
  id: number;
  driverId: number;
  driverName: number;
  payrollId: number;
  code: string;
  name: string;
  type: string;
  prevData: string;
  newData: string;
  changedByUsername: string;

  createdAt: string;
}