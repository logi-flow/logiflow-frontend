import type { DriverDistrict } from "../../../enums/driver-district.enum";

export interface UpdateDriverByAdminRequestDto {
    name: string;
    phoneNumber: string;
    zipcode: string;
    adress: string;
    addressDetail?: string;
    district: DriverDistrict;
}