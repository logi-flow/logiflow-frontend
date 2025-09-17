export const AssignmentStatus = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  DELETED: "DELETED"
} as const;

export type AssignmentStatus = (typeof AssignmentStatus) [keyof typeof AssignmentStatus];