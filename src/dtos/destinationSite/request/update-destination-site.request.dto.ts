export interface UpdateDestinationSiteRequestDto {
  name: string;
  zipCode: string;
  phoneNumber: string;
  address: string;
  addressDetail?: string;
}