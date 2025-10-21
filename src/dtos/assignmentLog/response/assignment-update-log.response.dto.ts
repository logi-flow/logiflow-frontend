export interface AssignmentUpdateLogResponseDto {
    id: number;
    driverName: string;
    vehicleNumber: string;
    changedByUsername: string;
    type: string;
    prevData: string;
    newData: string;

    createdAt: string;
}