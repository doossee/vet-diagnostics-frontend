import type { LanguageLocales, MucosaType } from "@/shared/types"; 

export const MUCOSA_TYPES_ARRAY = [
  "ORAL",
  "NASAL",
  "OCULAR",
  "REPRODUCTIVE",
] as const;

export const MUCOSA_TYPES: Record<MucosaType, Record<LanguageLocales, string>> = {
  ORAL: {
    ru: "Оральный (ротовой)",
    uz: "Og'iz bo'shlig'i",
  },
  NASAL: {
    ru: "Назальный (носовой)",
    uz: "Burun bo'shlig'i",
  },
  OCULAR: {
    ru: "Окулярный (глазной)",
    uz: "Ko'z shilliq qavati",
  },
  REPRODUCTIVE: {
    ru: "Репродуктивный",
    uz: "Reproduktiv organ",
  },
};