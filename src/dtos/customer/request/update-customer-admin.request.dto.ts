export interface UpdateCustomerAdminRequestDto {
  businessNumber: string;
  name: string;
  representativeName: string;
  businessType: string;
  businessItems: string;
  telephone: string;
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