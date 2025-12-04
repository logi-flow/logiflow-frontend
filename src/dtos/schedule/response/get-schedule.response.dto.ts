export interface GetScheduleResponseDto {
  id: number;
  allocationId: number;
  allocationStatus: string;
  deliveryType: string;
  deliveryId: number;
  collectionSitePhoneNumber: string;
  collectionSiteZipcode: string;
  collectionSiteAddress: string;
  collectionSiteAddressDetail: string;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  recipientAddressDetail: string;
  recipientZipcode: string;
  driverId: number;
  driverName: string;
  driverPhone: string;
  allocationDate: string;
  departureTime: string;
  arrivalTime: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}