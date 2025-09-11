export const DeductionTypeStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED"
} as const;

export type DeductionTypeStatus = (typeof DeductionTypeStatus) [keyof typeof DeductionTypeStatus];