export const CustomerStatus = {
  PENDING: "ACTIVE",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DELETED: "DELETED"
} as const;

export type CustomerStatus = (typeof CustomerStatus) [keyof typeof CustomerStatus];