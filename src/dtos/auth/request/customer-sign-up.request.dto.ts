export interface CustomerSignUpRequestDto {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
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