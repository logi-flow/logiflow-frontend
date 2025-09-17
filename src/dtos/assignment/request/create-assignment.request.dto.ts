import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface CreateAssignmentRequestDto {
    driverId: number;
    vehicleId: number;
    isPrimary: boolean;
    stauts: AssignmentStatus;
}