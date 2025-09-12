import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  title?: string;
  open?: boolean;
  children?: ReactNode;
  widthClassName?: string;
  onClose?: () => void;
}

export function Modal({ children, open, title, widthClassName, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn("bg-card overflow-auto max-h-screen md:max-h-[95vh]", widthClassName)} aria-describedby={undefined}>
        <DialogHeader className="pb-2!">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
