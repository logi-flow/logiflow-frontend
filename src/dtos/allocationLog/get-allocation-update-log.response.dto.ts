export interface GetAllocationUpdateLogResponseDto {
  id: number;
  allocationId: number;
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