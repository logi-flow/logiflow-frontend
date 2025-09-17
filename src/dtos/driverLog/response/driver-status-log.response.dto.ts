import type { DriverStatus } from "../../../enums/driver-status.enum";

export interface DriverStatusLogResponseDto {
    id: number;
    username: string;
    changedByUsername: string;
    changeReason: string;    
    prevData: DriverStatus;
    newData: DriverStatus;

    createdAt: string;
}