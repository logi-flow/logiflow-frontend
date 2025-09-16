export interface GetAllDeliveryResponseDto {
  id: number;
  customerId: number;
  requestDate: string;
  item: string;
  weight: number;
  message: string;
  isHidden: boolean;
  status: string;
  pickupName: string;
  recipientName: string;
  createdAt: string;
  updatedAt: string;
}