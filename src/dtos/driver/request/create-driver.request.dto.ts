import type { DriverDistrict } from "../../../enums/driver-district.enum";
import type { DriverStatus } from "../../../enums/driver-status.enum";

export interface CreateDriverRequestDto {
    status: DriverStatus;
    name: string;
    email: string;
    identityNumber: string;
    phoneNumber: string;
    zipcode: string;
    adress: string;
    addressDetail?: string;
    district: DriverDistrict;
    pay: number;
    companyJoin: string;
}