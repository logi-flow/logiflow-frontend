import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface GetAssignmentDetailResponseDto {
    id: number;
    driverId: number;
    vehicleIds: number[];
    isPrimary: boolean;
    status: AssignmentStatus;
    
    createdAt: string;
    updatedAt: string;
}