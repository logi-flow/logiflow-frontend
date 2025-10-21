import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface UpdateAssignmentResponseDto {
    id: number;
    driverId: number;
    vehicleId: number;
    isPrimary: boolean;
    status: AssignmentStatus;
    
    createdAt: string;
    updatedAt: string;
}