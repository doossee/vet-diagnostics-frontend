import { LanguageLocales, WoolType, DownType, HairType, FeatherType } from "@/shared/types";

// --------------------------------------
// WOOL TYPE
// --------------------------------------

export const WOOL_TYPE_ARRAY = ["EVEN", "UNEVEN", "LYING_FLAT", "SHINY", "MATTE", "NOT_FALLING", "DISHEVELED", "MATTED", "BALD_PATCHES", "THICK", "SPARSE", "PHYSIOLOGICAL_MOLT", "PATHOLOGICAL_MOLT", "FALLING", "NOT_FALLING_OUT"] as const;

export const WOOL_TYPE: Record<WoolType, Record<LanguageLocales, string>> = {
  EVEN: {
    ru: "Ровная",
    uz: "Tekis",
  },
  UNEVEN: {
    ru: "Неровная",
    uz: "Notekis",
  },
  LYING_FLAT: {
    ru: "Прилегающая",
    uz: "Yopishgan",
  },
  SHINY: {
    ru: "Блестящая",
    uz: "Yaltiroq",
  },
  MATTE: {
    ru: "Матовая",
    uz: "Matt",
  },
  NOT_FALLING: {
    ru: "Не выпадает",
    uz: "Tushmayapti",
  },
  DISHEVELED: {
    ru: "Взъерошенная",
    uz: "Tartibsiz",
  },
  MATTED: {
    ru: "Свалянная",
    uz: "Yopishgan",
  },
  BALD_PATCHES: {
    ru: "Лысые участки",
    uz: "Kal joylar",
  },
  THICK: {
    ru: "Густая",
    uz: "Qalin",
  },
  SPARSE: {
    ru: "Редкая",
    uz: "Siyrak",
  },
  PHYSIOLOGICAL_MOLT: {
    ru: "Физиологическая линька",
    uz: "Fiziologik to‘kilish",
  },
  PATHOLOGICAL_MOLT: {
    ru: "Патологическая линька",
    uz: "Patologik to‘kilish",
  },
  FALLING: {
    ru: "Выпадает",
    uz: "Tushmoqda",
  },
  NOT_FALLING_OUT: {
    ru: "Не линяет",
    uz: "Linyalanmayapti",
  },
};

// --------------------------------------
// DOWN TYPE
// --------------------------------------

export const DOWN_TYPE_ARRAY = ["DENSE", "SPARSE", "NONE", "SOFT", "SMOOTH", "MATTE", "SHINY", "DRY", "DUSTY", "EVEN", "WHITE", "GRAY", "YELLOWISH", "DARK", "MOIST"] as const;

export const DOWN_TYPE: Record<DownType, Record<LanguageLocales, string>> = {
  DENSE: {
    ru: "Густой",
    uz: "Qalin",
  },
  SPARSE: {
    ru: "Редкий",
    uz: "Siyrak",
  },
  NONE: {
    ru: "Отсутствует",
    uz: "Yo‘q",
  },
  SOFT: {
    ru: "Мягкий",
    uz: "Yumshoq",
  },
  SMOOTH: {
    ru: "Гладкий",
    uz: "Silliq",
  },
  MATTE: {
    ru: "Матовый",
    uz: "Matt",
  },
  SHINY: {
    ru: "Блестящий",
    uz: "Yaltiroq",
  },
  DRY: {
    ru: "Сухой",
    uz: "Quruq",
  },
  DUSTY: {
    ru: "Пыльный",
    uz: "Changli",
  },
  EVEN: {
    ru: "Ровный",
    uz: "Tekis",
  },
  WHITE: {
    ru: "Белый",
    uz: "Oq",
  },
  GRAY: {
    ru: "Серый",
    uz: "Kulrang",
  },
  YELLOWISH: {
    ru: "Желтоватый",
    uz: "Sariqimtir",
  },
  DARK: {
    ru: "Тёмный",
    uz: "Qoramtir",
  },
  MOIST: {
    ru: "Влажный",
    uz: "Nam",
  },
};

// --------------------------------------
// HAIR TYPE
// --------------------------------------

export const HAIR_TYPE_ARRAY = ["COARSE", "SPARSE"] as const;

export const HAIR_TYPE: Record<HairType, Record<LanguageLocales, string>> = {
  COARSE: {
    ru: "Грубые",
    uz: "Dag‘al",
  },
  SPARSE: {
    ru: "Редкие",
    uz: "Siyrak",
  },
};

// --------------------------------------
// FEATHER TYPE
// --------------------------------------

export const FEATHER_TYPE_ARRAY = ["SHINY", "MATTE", "FULL", "FALLEN", "BROKEN"] as const;

export const FEATHER_TYPE: Record<FeatherType, Record<LanguageLocales, string>> = {
  SHINY: {
    ru: "Блестящие",
    uz: "Yaltiroq",
  },
  MATTE: {
    ru: "Матовые",
    uz: "Matt",
  },
  FULL: {
    ru: "Полные",
    uz: "To‘liq",
  },
  FALLEN: {
    ru: "Выпавшие",
    uz: "Tushib ketgan",
  },
  BROKEN: {
    ru: "Поломанные",
    uz: "Singan",
  },
};
