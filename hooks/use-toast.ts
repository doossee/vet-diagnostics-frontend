import { toast } from 'sonner'

export function createToast(message: string, type: "SUCCESS" | "WARNING") {
    toast(message, {
        style: { background: "hsl(var(--card))" },
        action: { label: "Yopish", onClick: () => {} },
        actionButtonStyle: type === "SUCCESS" ? { background: "hsl(var(--primary))" } : { background: 'red', color: 'white' },
    })
}