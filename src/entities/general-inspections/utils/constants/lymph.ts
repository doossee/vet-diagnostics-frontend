import { LanguageLocales, LymphSize, LymphShape, LymphSurface, LymphConsistency, LymphTemp, LymphPain, LymphMobility } from "@/shared/types";

// --------------------------------------
// LYMPH SIZE
// --------------------------------------

export const LYMPH_SIZE_ARRAY = ["NORMAL", "ENLARGED"] as const;

export const LYMPH_SIZE: Record<LymphSize, Record<LanguageLocales, string>> = {
  NORMAL: {
    ru: "Нормальный",
    uz: "Normal",
  },
  ENLARGED: {
    ru: "Увеличенный",
    uz: "Kattalashgan",
  },
};

// --------------------------------------
// LYMPH SHAPE
// --------------------------------------

export const LYMPH_SHAPE_ARRAY = ["FLAT", "ROUND", "ENLARGED", "SWOLLEN"] as const;

export const LYMPH_SHAPE: Record<LymphShape, Record<LanguageLocales, string>> = {
  FLAT: {
    ru: "Плоская",
    uz: "Yassi",
  },
  ROUND: {
    ru: "Круглая",
    uz: "Dumaloq",
  },
  ENLARGED: {
    ru: "Увеличенная",
    uz: "Kattalashgan",
  },
  SWOLLEN: {
    ru: "Вздутие / отёчная",
    uz: "Shishgan",
  },
};

// --------------------------------------
// LYMPH SURFACE
// --------------------------------------

export const LYMPH_SURFACE_ARRAY = ["SMOOTH", "ROUGH"] as const;

export const LYMPH_SURFACE: Record<LymphSurface, Record<LanguageLocales, string>> = {
  SMOOTH: {
    ru: "Гладкая",
    uz: "Silliq",
  },
  ROUGH: {
    ru: "Шероховатая",
    uz: "G‘adir-budir",
  },
};

// --------------------------------------
// LYMPH CONSISTENCY
// --------------------------------------

export const LYMPH_CONSISTENCY_ARRAY = ["DENSE", "SOFT", "SPECIFIC"] as const;

export const LYMPH_CONSISTENCY: Record<LymphConsistency, Record<LanguageLocales, string>> = {
  DENSE: {
    ru: "Плотная",
    uz: "Qattiq",
  },
  SOFT: {
    ru: "Мягкая",
    uz: "Yumshoq",
  },
  SPECIFIC: {
    ru: "Специфическая",
    uz: "Spesifik",
  },
};

// --------------------------------------
// LYMPH TEMPERATURE
// --------------------------------------

export const LYMPH_TEMP_ARRAY = ["NORMAL", "ELEVATED"] as const;

export const LYMPH_TEMP: Record<LymphTemp, Record<LanguageLocales, string>> = {
  NORMAL: {
    ru: "Нормальная",
    uz: "Normal",
  },
  ELEVATED: {
    ru: "Повышенная",
    uz: "Ko‘tarilgan",
  },
};

// --------------------------------------
// LYMPH PAIN
// --------------------------------------

export const LYMPH_PAIN_ARRAY = ["PAINLESS", "PAINFUL"] as const;

export const LYMPH_PAIN: Record<LymphPain, Record<LanguageLocales, string>> = {
  PAINLESS: {
    ru: "Безболезненная",
    uz: "Og‘riqsiz",
  },
  PAINFUL: {
    ru: "Болезненная",
    uz: "Og‘riqli",
  },
};

// --------------------------------------
// LYMPH MOBILITY
// --------------------------------------

export const LYMPH_MOBILITY_ARRAY = ["MOBILE", "LOW_MOBILITY"] as const;

export const LYMPH_MOBILITY: Record<LymphMobility, Record<LanguageLocales, string>> = {
  MOBILE: {
    ru: "Подвижная",
    uz: "Harakatchan",
  },
  LOW_MOBILITY: {
    ru: "Малоподвижная",
    uz: "Kam harakatchan",
  },
};
