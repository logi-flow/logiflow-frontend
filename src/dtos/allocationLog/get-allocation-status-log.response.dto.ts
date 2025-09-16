export interface getAllocationStatusLogResponseDto {
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