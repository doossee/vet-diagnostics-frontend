"use client";

import { useLocale } from "next-intl";
import { LOCALES } from "@/shared/constants";
import { Button } from "@/shared/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/shared/hooks/use-language";

export function ToggleLocale() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const { setLocale } = useLanguage();

  const changeLocale = (lang: string) => {
    const newpath = pathname.replace("/" + locale, "");
    router.replace(`/${lang}${newpath}`);
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
