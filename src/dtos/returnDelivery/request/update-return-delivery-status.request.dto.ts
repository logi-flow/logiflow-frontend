import type { DeliveryStatus } from "../../../enums/delivery-status.enum";

export interface UpdateReturnDeliveryStatusRequestDto {
  status: DeliveryStatus;
  changeReason: string;
}
