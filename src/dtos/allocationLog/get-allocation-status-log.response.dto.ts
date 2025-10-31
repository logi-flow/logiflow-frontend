export interface GetAllocationStatusLogResponseDto {
  id: number;
  allocationId: number;
  deliveryId: number;
  returnDeliveryId: number;
  driverName: string;
  vehicleNumber: string;
  changedByUsername: string;
  changeReason: string;
  prevStatus: string;
  newStatus: string;
  createdAt: string;
}