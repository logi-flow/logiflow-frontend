import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface AssignmentStatusLogResponseDto {
    id: number;
    driverName: string;
    vehicleNumber: string;
    changedByUsername: string;
    changeReason: string;    
    prevData: AssignmentStatus;
    newData: AssignmentStatus;

    createdAt: string;
}