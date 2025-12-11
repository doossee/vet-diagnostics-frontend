import { LanguageLocales, UserGender } from '@/shared/types'

export const USER_GENDERS_ARRAY = ['MALE', 'FEMALE'] as const;

export const USER_GENDERS: Record<UserGender, Record<LanguageLocales, string>> = {
  FEMALE: {
    ru: "",
    uz: ""
  },
  MALE: {
    ru: "",
    uz: ""
  }
}