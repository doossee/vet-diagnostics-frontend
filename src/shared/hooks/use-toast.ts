import { toast } from "sonner";

export function createToast(message: string, type: "SUCCESS" | "WARNING") {
  toast(message, {
    style: { background: "hsl(var(--card))" },
    action: { label: "Закрыть", onClick: () => {} },
    actionButtonStyle: type === "SUCCESS" ? { background: "hsl(120, 60%, 30%)", color: "white" } : { background: "red", color: "white" },
  });
}
