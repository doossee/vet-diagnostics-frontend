import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/components/ui/separator";

export function Divider({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label ? <span className="dark:text-gray-300 text-sm">{label}</span> : null}
      <Separator className="flex-1" />
    </div>
  );
}
