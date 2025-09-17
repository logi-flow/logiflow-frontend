import type { DriverDistrict } from "../../../enums/driver-district.enum";
import type { DriverLicenseType } from "../../../enums/driver-license-type.enum";
import type { DriverStatus } from "../../../enums/driver-status.enum";

export interface GetDriverDetailResponseDto {
    driverId: number;
    name: string;
    username: string;
    status: DriverStatus;
    phoneNumber: string;
    identityNumber: string;
    zipcode: string;
    adress: string;
    addressDetail?: string;
    district: DriverDistrict;
    pay: number;
    companyJoin: string;
    driverType: DriverLicenseType;

    createdAt: string;
    updatedAt: string;
}