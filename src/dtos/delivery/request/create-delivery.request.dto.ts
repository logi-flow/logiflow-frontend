export interface CreateDeliveryRequestDto {
  contractId: number;
  requestDate: string;
  item: string;
  weight: number;
  message?: string;
  status: string;
  collectionSiteId: number;
  recipientName: string;
  recipientPhone: string;
  recipientZipcode: string;
  recipientAddress: string;
  recipientAddressDetail?: string;
}