import clsx from "clsx";
import { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";

interface Props {
  title?: string;
  open?: boolean;
  children?: ReactNode;
  widthClassName?: string;
  onClose?: () => void;
}

export function Drawer({ children, open, title, widthClassName, onClose }: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className={clsx("gap-0", widthClassName)} aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-full p-4 border-t">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
