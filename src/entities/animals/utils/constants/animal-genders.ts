import { AnimalSex } from "@/shared/types";

export const ANIMAL_GENDERS_ARRAY = [
  "FEMALE",
  "MALE",
  "NEUTERED",
  "SPAYED",
  "UNKNOWN"
] as const;

export const ANIMAL_GENDERS: Record<AnimalSex, { uz: string; ru: string }> = {
  FEMALE: {
    uz: "Urg'ochi",
    ru: "Самка"
  },
  MALE: {
    uz: "Erkak",
    ru: "Самец"
  },
  NEUTERED: {
    uz: "Kastratsiya qilingan",
    ru: "Кастрированный"
  },
  SPAYED: {
    uz: "Sterilizatsiya qilingan",
    ru: "Стерилизованная"
  },
  UNKNOWN: {
    uz: "Noma'lum",
    ru: "Неизвестно"
  }
};