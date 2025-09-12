"use client";

import { createPortal } from "react-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useIsClient } from "@/shared/hooks/use-client";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ReactNode, useCallback, useState } from "react";

export function FiltersWrapper({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);

  const opened = useCallback(() => {
    if (!isMobile) return true;

    return isOpen;
  }, [isMobile, isOpen]);

  return (
    <>
      {opened() && children}
      {isMobile &&
        isClient &&
        createPortal(
          <Button variant="outline" size="icon" onClick={() => setIsOpen((p) => !p)}>
            <SlidersHorizontal />
          </Button>,
          document.getElementById("top-bar-teleport")!,
        )}
    </>
  );
}
