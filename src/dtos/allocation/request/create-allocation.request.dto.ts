export interface CreateAllocationRequestDto {
  deliveryId?: number;
  returnDeliveryId?: number;
  assignmentId: number;
  districtName: string;
  status: string;
}