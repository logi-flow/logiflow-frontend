export const Fuel = {
  GASOLINE: "GASOLINE",
  LPG: "LPG",
  ELECTRIC: "ELECTRIC",
  DIESEL: "DIESEL"
} as const;

export type Fuel = (typeof Fuel) [keyof typeof Fuel];