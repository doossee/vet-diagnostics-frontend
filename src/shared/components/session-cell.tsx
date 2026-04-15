"use client";

import { format } from "date-fns";
import { Link } from "@/shared/i18n/routing";
import { routes } from "@/shared/constants/routes";
import { MedicalSession } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { SESSION_STATUSES } from "@/entities/sessions/utils/constants/session-statuses";

const STATUS_CONFIG = {
  SUBMITTED: { dot: "bg-green-500", border: "border-l-green-500", bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400" },
  READY:     { dot: "bg-blue-500",  border: "border-l-blue-500",  bg: "bg-blue-50 dark:bg-blue-950/30",  text: "text-blue-700 dark:text-blue-400"  },
  DRAFT:     { dot: "bg-amber-400", border: "border-l-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400" },
} as const;

interface Props {
  session: MedicalSession;
}

export function SessionCell({ session }: Props) {
  const { locale } = useI18n();
  const status = (session.status as keyof typeof STATUS_CONFIG) in STATUS_CONFIG
    ? (session.status as keyof typeof STATUS_CONFIG)
    : "DRAFT";
  const cfg = STATUS_CONFIG[status];
  const label = SESSION_STATUSES[status]?.label[locale] ?? status;

  return (
    <Link
      href={routes.SESSIONS.ID(session.id)}
      className={`flex items-stretch gap-0 rounded-md border-l-2 ${cfg.border} ${cfg.bg} hover:opacity-80 transition-opacity overflow-hidden min-w-[120px]`}
    >
      <div className="flex flex-col leading-tight px-2 py-1 gap-0.5">
        {session.animal?.animalNameCode && (
          <span className="font-semibold text-sm text-foreground truncate max-w-[140px]">
            {session.animal.animalNameCode}
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          {format(new Date(session.date), "dd.MM.yyyy")}
        </span>
        <span className={`text-[10px] font-medium leading-none ${cfg.text}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}
