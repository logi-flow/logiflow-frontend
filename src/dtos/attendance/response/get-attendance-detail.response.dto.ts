export interface GetAttendanceDetailResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  driverPhone: string;
  driverCompanyJoin: string;
  workStart: string;
  workEnd: string | null;
  openFlag: 1 | null;
  
  createdAt: string;
  updatedAt: string;
}