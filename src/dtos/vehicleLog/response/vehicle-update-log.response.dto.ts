export interface VehicleUpdateLogResponseDto {
    id: number;
    vehicleNumber: string;
    changedByUsername: string;
    type: string;
    prevData: string;
    newData: string;

    createdAt: number;
}