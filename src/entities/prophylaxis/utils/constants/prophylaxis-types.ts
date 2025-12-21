import { LanguageLocales, ProphylaxisType } from "@/shared/types";

export const PROPHYLAXIS_TYPES_ARRAY = [
  "DEWORMING",
  "IMMUNIZATION",
  "VACCINE"
] as const

export const PROPHYLAXIS_TYPES: Record<ProphylaxisType, Record<LanguageLocales, string>> = {
  DEWORMING: {
    ru: "Дегельминтизация",
    uz: "Degelmintizatsiya"
  },
  IMMUNIZATION: {
    ru: "Иммунизация",
    uz: "Immunizatsiya"
  },
  VACCINE: {
    ru: "Вакцинация",
    uz: "Vaksinatsiya"
  }
}

export const PROPHYLAXIS_BADGE_COLORS: Record<ProphylaxisType, string> = {
  DEWORMING: "warning",
  IMMUNIZATION: "success",
  VACCINE: "info",
} as const