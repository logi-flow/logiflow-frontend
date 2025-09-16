export interface GetDeliveryStatusLogResponseDto {
  id: number;
  deliveryId: number;
  username: string;
  changeReason: string;
  prevStatus: string;
  newStatus: string;
  createdAt: string;
}