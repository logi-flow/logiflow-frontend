export interface GetScheduleResponseDto {
  id: number;
  allocationId: number;
  allocationDate: string;
  departureTime: string;
  arrivalTime: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}