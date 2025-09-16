export const UserStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED"
} as const;

export type UserStatus = (typeof UserStatus) [keyof typeof UserStatus];