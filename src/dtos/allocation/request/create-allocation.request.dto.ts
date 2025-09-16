export interface CreateContractRequestDto {
  deliveryId?: number;
  returnDeliveryId?: number;
  assignmentId: number;
  districtName: string;
  status: string;
}