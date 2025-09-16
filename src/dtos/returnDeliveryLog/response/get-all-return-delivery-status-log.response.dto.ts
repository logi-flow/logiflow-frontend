import type { DeliveryStatus } from "../../../enums/delivery-status.enum";

export interface GetAllReturnDeliveryStatusLogResponseDto {
  id: number;
  returnDeliveryId: number;
  username: string;
  changeReason: string;
  prevStatus: DeliveryStatus;
  newStatus: DeliveryStatus;
  createdAt: string;
}
