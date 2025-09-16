export interface GetEmployeeUpdateLogResponseDto {
  id?: number;
  employeeId: number;
  username: string;
  type: string;
  prevData: string;
  newData: string;
  createdAt: string;
}