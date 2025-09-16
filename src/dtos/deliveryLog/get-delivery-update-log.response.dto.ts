export interface GetDeliveryUpdateLogResponseDto {
  id: number;
  deliveryId: number;
  username: string;
  type: string;
  prevData: string;
  newData: string;
  createdAt: string;
}