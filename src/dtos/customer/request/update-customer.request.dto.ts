export interface UpdateCustomerRequestDto {
  fax?: string;
  businessZipCode: string;
  businessAddress: string;
  businessAddressDetail?: string;
  chargePosition?: string;
  chargeDepartment?: string;
  chargeName?: string;
  chargePhone?: string;
  chargeEmail?: string;
}