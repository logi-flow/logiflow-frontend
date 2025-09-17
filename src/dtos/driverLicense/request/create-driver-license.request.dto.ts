import type { DriverLicenseType } from "../../../enums/driver-license-type.enum";

export interface CreateDriverLicenseRequestDto {
    dirverNumber: string;
    type: DriverLicenseType;
    expiredDate: string;
}