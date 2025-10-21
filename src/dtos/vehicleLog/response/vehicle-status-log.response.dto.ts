import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface VehicleStatusLogResponseDto {
    id: number;
    vehicleNumber: string;
    changedByUsername: string;
    changeReason: string;    
    prevData: VehicleStatus;
    newData: VehicleStatus;

    createdAt: string;
}