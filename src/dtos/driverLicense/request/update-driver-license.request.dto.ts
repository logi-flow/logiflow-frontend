import type { DriverLicenseType } from "../../../enums/driver-license-type.enum";

export interface UpdateDriverLicenseRequestDto {
    type: DriverLicenseType;
    expiredDate: string;
}