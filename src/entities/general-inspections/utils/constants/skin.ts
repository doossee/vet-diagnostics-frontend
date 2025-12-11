import { LanguageLocales, SkinColor, SkinHumidity, SkinTemp, SkinElasticity } from "@/shared/types";

// --------------------------------------
// SKIN COLOR
// --------------------------------------

export const SKIN_COLOR_ARRAY = ["PALE_VIOLET", "PALE", "RED", "BLUE", "YELLOW"] as const;

export const SKIN_COLOR: Record<SkinColor, Record<LanguageLocales, string>> = {
  PALE_VIOLET: {
    ru: "Бледно-фиолетовый",
    uz: "Oqish binafsha",
  },
  PALE: {
    ru: "Бледный",
    uz: "Oqish",
  },
  RED: {
    ru: "Красный",
    uz: "Qizil",
  },
  BLUE: {
    ru: "Синий (цианоз)",
    uz: "Ko‘k (sianoz)",
  },
  YELLOW: {
    ru: "Жёлтый",
    uz: "Sariq",
  },
};

// --------------------------------------
// SKIN HUMIDITY
// --------------------------------------

export const SKIN_HUMIDITY_ARRAY = ["MODERATE", "HYPERHIDROSIS", "LOCAL_SWEAT", "DRY"] as const;

export const SKIN_HUMIDITY: Record<SkinHumidity, Record<LanguageLocales, string>> = {
  MODERATE: {
    ru: "Умеренная",
    uz: "O‘rtacha",
  },
  HYPERHIDROSIS: {
    ru: "Гипергидроз",
    uz: "Gipergidroz",
  },
  LOCAL_SWEAT: {
    ru: "Локальная потливость",
    uz: "Mahalliy terlash",
  },
  DRY: {
    ru: "Сухая",
    uz: "Quruq",
  },
};

// --------------------------------------
// SKIN TEMPERATURE
// --------------------------------------

export const SKIN_TEMP_ARRAY = ["GENERAL_HIGH", "LOCAL_HIGH", "GENERAL_LOW", "LOCAL_LOW", "UNEVEN"] as const;

export const SKIN_TEMP: Record<SkinTemp, Record<LanguageLocales, string>> = {
  GENERAL_HIGH: {
    ru: "Общая повышенная",
    uz: "Umumiy yuqori",
  },
  LOCAL_HIGH: {
    ru: "Локально повышенная",
    uz: "Mahalliy yuqori",
  },
  GENERAL_LOW: {
    ru: "Общая пониженная",
    uz: "Umumiy past",
  },
  LOCAL_LOW: {
    ru: "Локально пониженная",
    uz: "Mahalliy past",
  },
  UNEVEN: {
    ru: "Неравномерная",
    uz: "Notekis",
  },
};

// --------------------------------------
// SKIN ELASTICITY
// --------------------------------------

export const SKIN_ELASTICITY_ARRAY = ["ELASTIC", "REDUCED", "NONE"] as const;

export const SKIN_ELASTICITY: Record<SkinElasticity, Record<LanguageLocales, string>> = {
  ELASTIC: {
    ru: "Эластичная",
    uz: "Elastik",
  },
  REDUCED: {
    ru: "Сниженная",
    uz: "Pasaygan",
  },
  NONE: {
    ru: "Отсутствует",
    uz: "Yo‘q",
  },
};
