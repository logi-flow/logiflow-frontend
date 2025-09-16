export const Department = {
  HUMAN_RESOURCES: "HUMAN_RESOURCES",
  LOGISTICS_MANAGEMENT: "LOGISTICS_MANAGEMENT"
} as const;

export type Department = (typeof Department) [keyof typeof Department];