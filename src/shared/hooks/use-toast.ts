import { toast } from "sonner";
import { useLanguage } from "./use-language";
import { COMMON_LABELS } from "@/shared/constants";

type LocaleMessage = { ru: string; uz: string } & Record<string, string>;

export function createToast(message: string | LocaleMessage, type: "SUCCESS" | "WARNING") {
  const locale = useLanguage().getLocale;
  const text = typeof message === "string"
    ? message
    : message[locale] ?? message.ru ?? String(Object.values(message)[0]);

  toast(text, {
    style: { background: "hsl(var(--card))" },
    action: { label: COMMON_LABELS.CLOSE[locale], onClick: () => {} },
    actionButtonStyle: type === "SUCCESS" ? { background: "hsl(120, 60%, 30%)", color: "white" } : { background: "red", color: "white" },
  });
}
