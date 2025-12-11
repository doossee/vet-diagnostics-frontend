import { BodyPosition, BodyType, Constitution, LanguageLocales, ObesityType, Temperament } from "@/shared/types";

export const BODY_TYPE_ARRAY = [
  "STRONG",
  "MEDIUM",
  "WEAK",
] as const;

export const BODY_TYPE: Record<BodyType, Record<LanguageLocales, String>> = {
  STRONG: {
    ru: "Крепкое",
    uz: "Kuchli"
  },
  MEDIUM: {
    ru: "Среднее",
    uz: "O‘rtacha"
  },
  WEAK: {
    ru: "Слабое",
    uz: "Zaif"
  }
};

export const OBESITY_TYPE_ARRAY = [
  "HIGH",
  "MEDIUM",
  "LOW",
  "CACHEXIA",
] as const;

export const OBESITY_TYPE: Record<ObesityType, Record<LanguageLocales, String>> = {
  HIGH: {
    ru: "Высокая",
    uz: "Yuqori"
  },
  MEDIUM: {
    ru: "Средняя",
    uz: "O‘rtacha"
  },
  LOW: {
    ru: "Низкая",
    uz: "Past"
  },
  CACHEXIA: {
    ru: "Кахексия",
    uz: "Kaxeksiya"
  }
};

export const BODY_POSITION_ARRAY = [
  "NATURAL",
  "FORCED_STANDING",
  "FORCED_LYING",
  "FORCED_SITTING",
  "NON_THERAPEUTIC",
  "INVOLUNTARY",
  "MANEGE",
  "CIRCULAR",
  "FORWARD",
  "BACKWARD",
  "ROLLING",
] as const;

export const BODY_POSITION: Record<BodyPosition, Record<LanguageLocales, String>> = {
  NATURAL: {
    ru: "Естественная",
    uz: "Tabiiy"
  },
  FORCED_STANDING: {
    ru: "Вынужденная стоячая",
    uz: "Majburiy tik turgan"
  },
  FORCED_LYING: {
    ru: "Вынужденная лежачая",
    uz: "Majburiy yotgan"
  },
  FORCED_SITTING: {
    ru: "Вынужденная сидячая",
    uz: "Majburiy o‘tirgan"
  },
  NON_THERAPEUTIC: {
    ru: "Нетерапевтическая",
    uz: "Tibbiy bo‘lmagan"
  },
  INVOLUNTARY: {
    ru: "Непроизвольная",
    uz: "Ixtiyorsiz"
  },
  MANEGE: {
    ru: "Манежная",
    uz: "Manej"
  },
  CIRCULAR: {
    ru: "Круговая",
    uz: "Aylana"
  },
  FORWARD: {
    ru: "Наклон вперёд",
    uz: "Oldinga egilgan"
  },
  BACKWARD: {
    ru: "Наклон назад",
    uz: "Orqaga egilgan"
  },
  ROLLING: {
    ru: "Катание",
    uz: "Aylanib ketish"
  }
};

export const CONSTITUTION_ARRAY = [
  "LOOSE",
  "DENSE",
  "HORSES",
  "BIRDS",
] as const;

export const CONSTITUTION: Record<Constitution, Record<LanguageLocales, String>> = {
  LOOSE: {
    ru: "Рыхлая",
    uz: "Bo‘sh"
  },
  DENSE: {
    ru: "Плотная",
    uz: "Qattiq"
  },
  HORSES: {
    ru: "Лошади",
    uz: "Otlar"
  },
  BIRDS: {
    ru: "Птицы",
    uz: "Qushlar"
  }
};

export const TEMPERAMENT_ARRAY = [
  "MELANCHOLIC",
  "PHLEGMATIC",
] as const;

export const TEMPERAMENT: Record<Temperament, Record<LanguageLocales, String>> = {
  MELANCHOLIC: {
    ru: "Меланхолик",
    uz: "Melanxolik"
  },
  PHLEGMATIC: {
    ru: "Флегматик",
    uz: "Flegmatik"
  }
};
