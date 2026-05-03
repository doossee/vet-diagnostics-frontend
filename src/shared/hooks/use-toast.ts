import React from "react";
import { toast } from "sonner";
import { useLanguage } from "./use-language";
import { ALERT_MESSAGES, COMMON_LABELS, NULL_FIELD_EXAM_GROUP, NULL_FIELD_EXAM_LABELS, NULL_FIELD_LABELS } from "@/shared/constants";

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

const GROUP_ORDER = ["clinical", "blood", "urine", "feces", "mucosa"];

export function createNullFieldsToast(fieldKeys: string[]) {
  const locale = useLanguage().getLocale as "ru" | "uz";

  const groups: Record<string, string[]> = {};
  for (const key of fieldKeys) {
    const group = NULL_FIELD_EXAM_GROUP[key] ?? "other";
    if (!groups[group]) groups[group] = [];
    groups[group].push(NULL_FIELD_LABELS[key]?.[locale] ?? NULL_FIELD_LABELS[key]?.ru ?? key);
  }

  const ordered = [...GROUP_ORDER.filter(g => groups[g]), ...(groups.other ? ["other"] : [])];

  const content = React.createElement(
    "div", { className: "text-sm" },
    React.createElement("p", { className: "font-semibold text-base mb-0.5" }, ALERT_MESSAGES.NULL_FIELDS_TITLE[locale]),
    React.createElement("p", { className: "text-xs opacity-70 mb-3" }, `${ALERT_MESSAGES.NULL_FIELDS_PREFIX[locale]}:`),
    ...ordered.map(groupKey =>
      React.createElement("div", { key: groupKey, className: "mb-2 last:mb-0" },
        React.createElement("p", { className: "font-medium text-xs opacity-60 mb-0.5" },
          NULL_FIELD_EXAM_LABELS[groupKey]?.[locale] ?? groupKey
        ),
        React.createElement("ul", { className: "space-y-0" },
          ...groups[groupKey].map((f, i) =>
            React.createElement("li", { key: i }, `- ${f}`)
          )
        )
      )
    )
  );

  toast(content, {
    style: { background: "hsl(var(--card))" },
    action: { label: COMMON_LABELS.CLOSE[locale], onClick: () => {} },
    actionButtonStyle: { background: "red", color: "white" },
  });
}
