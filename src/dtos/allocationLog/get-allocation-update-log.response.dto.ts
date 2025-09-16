export interface getAllocationUpdateLogResponseDto {
  deliveryId: number;
  returnDeliveryId: number;
  driverName: string;
  vehicleNumber: string;
  changedByUsername: string;
  type: string;
  prevData: string;
  newData: string;
  createdAt: string;
}