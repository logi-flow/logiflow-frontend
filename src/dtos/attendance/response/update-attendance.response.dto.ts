export interface UpdateAttendanceResponseDto {
  id: number;
  driverId: number;
  workStart: string;
  workEnd: string | null;
  openFlage: 1 | null;
  vehicleMileage: number;
  
  createdAt: string;
  updatedAt: string;
}