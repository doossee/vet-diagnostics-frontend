import { LanguageLocales } from "../types";
import { useLocale, useTranslations } from "next-intl";
import type { Messages } from "@/shared/messages";

export type { Messages };

export function useI18n() {
  const t = useTranslations<keyof Messages>();
  const locale = useLocale() as LanguageLocales;

  return { t, locale };
}
