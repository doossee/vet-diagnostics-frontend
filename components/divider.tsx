import { cn } from "~/lib/utils"
import { Separator } from "./ui/separator"

export function Divider({ label, className }: { label: string, className: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="dark:text-gray-300 text-sm">{label}</span>
            <Separator className="flex-1" />
        </div>
    )
}