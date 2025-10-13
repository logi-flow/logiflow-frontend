export interface GetAllAttendanceResponseDto {
  id: number;
  driverId: number;
  driverName: string;
  workStart: string;
  workEnd: string;
  
  createdAt: string;
  updatedAt: string;
}