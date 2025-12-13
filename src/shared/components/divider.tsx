import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/components/ui/separator";

export function Divider({ label, icon, className }: { label?: string; icon?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label ? <span className="dark:text-gray-300 text-sm flex items-center gap-2 text-nowrap">{icon}{label}</span> : null}
      <Separator className="flex-1" />
    </div>
  );
}
