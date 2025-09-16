import type { DeliveryStatus } from "../../../enums/delivery-status.enum";

export interface GetAllReturnDeliveryResponseDto {
    id: number;
    customerId: number;
    customerName: string;
    requestDate: string;
    item: string;
    weight: number;
    reason: string;
    status: DeliveryStatus;
    pickupName: string;
    recipientName: string;
    createdAt: string;
    updatedAt: string;
}