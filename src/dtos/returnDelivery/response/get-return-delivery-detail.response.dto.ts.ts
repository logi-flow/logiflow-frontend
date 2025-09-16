import type { DeliveryStatus } from "../../../enums/delivery-status.enum";

export interface GetReturnDeliveryDetailResponseDto {
  id: number;
  customerId: number;
  customerName: string;
  requestDate: string;
  item: string;
  weight: number;
  reason: string;
  status: DeliveryStatus;

  pickupName: string;
  pickupPhone: string;
  pickupZipcode: string;
  pickupAddress: string;
  pickupAddressDetail: string;

  recipientName: string;
  recipientPhone: string;
  recipientZipcode: string;
  recipientAddress: string;
  recipientAddressDetail: string;

  finalFee: number;
  overWeightFee: number;
  overParcelFee: number;
  isOverWeight: boolean;
  isOverParcel: boolean;

  createdAt: string;
  updatedAt: string;
}
