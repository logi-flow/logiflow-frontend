export interface CreateAttendanceResponseDto {
  id: number;
  driverId: number;
  workStart: string;
  openFlage: 1 | null;
  
  createdAt: string;
  updatedAt: string;
}