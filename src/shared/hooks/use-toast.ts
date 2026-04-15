import { toast } from "sonner";
import { useLanguage } from "./use-language";

type LocaleMessage = { ru: string; uz: string } & Record<string, string>;

export function createToast(message: string | LocaleMessage, type: "SUCCESS" | "WARNING") {
  const text = typeof message === "string"
    ? message
    : message[useLanguage().getLocale] ?? message.ru ?? String(Object.values(message)[0]);

  toast(text, {
    style: { background: "hsl(var(--card))" },
    action: { label: "Закрыть", onClick: () => {} },
    actionButtonStyle: type === "SUCCESS" ? { background: "hsl(120, 60%, 30%)", color: "white" } : { background: "red", color: "white" },
  });
}
