"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { cn } from "@/shared/lib/utils";

const Toaster = ({ className, style, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      {...props}
      theme={theme as ToasterProps["theme"]}
      className={cn("toaster group", className)}
      style={
        {
          zIndex: 9999,
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          ...(style as React.CSSProperties),
        } as React.CSSProperties
      }
    />
  );
};

export { Toaster };
