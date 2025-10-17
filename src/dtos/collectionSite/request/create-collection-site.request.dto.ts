export interface CreateCollectionSiteRequestDto {
  name: string;
  zipCode: string;
  phoneNumber: string;
  address: string;
  addressDetail?: string;
}