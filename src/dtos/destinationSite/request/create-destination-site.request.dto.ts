export interface CreateDestinationSiteRequestDto {
  name: string;
  zipCode: string;
  phoneNumber: string;
  address: string;
  addressDetail?: string;
}