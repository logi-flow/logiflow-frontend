import type { AssignmentStatus } from "../../../enums/assignment-status.enum";

export interface UpdtateAssignmentStatusRequestDto {
    stauts: AssignmentStatus;
    changeReason: string;
}