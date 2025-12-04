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
  fax?: string | null;
  businessZipCode: string;
  businessAddress: string;
  businessAddressDetail?: string | null;
  chargePosition?: string | null;
  chargeDepartment?: string | null;
  chargeName?: string | null;
  chargePhone?: string | null;
  chargeEmail?: string | null;
}