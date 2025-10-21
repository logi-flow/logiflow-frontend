import type { DriverStatus } from "../../../enums/driver-status.enum";

export interface GetAllDriverResponseDto {
    driverId: number;
    name: string;
    status: DriverStatus;
    phoneNumber: string;
    
    createdAt: string;
    updatedAt: string;
}