import { ProphylaxisType } from "@/shared/types";

export const PROPHYLAXIS_TYPES_ARRAY = [
  "DEWORMING",
  "IMMUNIZATION",
  "VACCINE"
] as const

export const PROPHYLAXIS_TYPES: Record<ProphylaxisType, string> = {
  DEWORMING: "Дегельминтизация",
  IMMUNIZATION: "Иммунизация",
  VACCINE: "Вакцинация"
}

export const PROPHYLAXIS_BADGE_COLORS: Record<ProphylaxisType, string> = {
  DEWORMING: "warning",
  IMMUNIZATION: "success",
  VACCINE: "info",
} as const