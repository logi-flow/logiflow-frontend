import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface GetAllAssignmentResponseDto {
    id: number;
    driverId: number;
    vehicleId: number;
    driverName: string;
    isPrimary: boolean;
    status: AssignmentStatus;

    createdAt: string;
    updatedAt: string;
}