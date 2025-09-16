export const DeliveryStatus = {
  REQUESTED: "REQUESTED",
  RECEIPTED: "RECEIPTED",
  CANCELLED: "CANCELLED",
  ASSIGNED: "ASSIGNED",
  REJECTED: "REJECTED",
  DELETED: "DELETED",
} as const;

export type DeliveryStatus = (typeof DeliveryStatus) [keyof typeof DeliveryStatus];