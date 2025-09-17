import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface CreateVehicleResponseDto {
    vehicleId: number;
    vehicleNumber: string;
    status: VehicleStatus;
    
    createdAt: string;
    updatedAt: string;
    
}