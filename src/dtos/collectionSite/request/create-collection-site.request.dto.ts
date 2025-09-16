export interface CreateCollectionStieRequestDto {
  name: string;
  zipCode: string;
  phoneNumber: string;
  address: string;
  addressDetail?: string;
}