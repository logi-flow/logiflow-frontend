export const AllocationStatus = {
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  DELETED: 'DELETED'
}

export type AllocationStatus = (typeof AllocationStatus)[keyof typeof AllocationStatus];