"use client";

import { useLocale } from "next-intl";
import { LOCALES } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/shared/i18n/routing";
import { useLanguage } from "@/shared/hooks/use-language";

export function ToggleLocale() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setLocale } = useLanguage();

  const changeLocale = (lang: string) => {
    const query = searchParams.toString();
    router.replace(
      (query ? `${pathname}?${query}` : pathname) as any,
      { locale: lang as "ru" | "uz" }
    );
    setLocale(lang);
  };

  return (
    <div className="grid gap-2 grid-cols-2">
      {LOCALES.map((l, i) => (
        <Button variant={l.locale === locale ? "outline" : "ghost"} key={i} size={"sm"} onClick={() => changeLocale(l.locale)} className="text-sm font-normal">
          {l.name}
        </Button>
      ))}
    </div>
  );
}
