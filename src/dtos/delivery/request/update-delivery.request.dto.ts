export interface UpdateDeliveryRequestDto {
  requestDate: string;
  item: string;
  weight: number;
  message?: string;
  collectionSiteId: number;
  recipientName: string;
  recipientPhone: string;
  recipientZipcode: string;
  recipientAddress: string;
  recipientAddressDetail?: string;
}