export const Position = {
  GENERAL_MANAGER: "GENERAL_MANAGER",
  DEPUTY_GENERAL_MANAGER: "DEPUTY_GENERAL_MANAGER",
  MANAGER: "MANAGER",
  ASSISTANT_MANAGER: "ASSISTANT_MANAGER",
  STAFF: "STAFF",
  INTERN: "INTERN"
} as const;

export type Position = (typeof Position) [keyof typeof Position];