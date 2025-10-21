import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface CreateAssignmentResponseDto {
    id: number;
    driverId: number;
    driverName: string;
    vehicleIds: number[];
    isPrimary: boolean;
    status: AssignmentStatus;
    
    createdAt: string;
    updatedAt: string;
}