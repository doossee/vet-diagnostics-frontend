"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CopyIdButtonProps {
  id: number | string;
}

export function CopyIdButton({ id }: CopyIdButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(String(id));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button onClick={handleCopy} size="sm" variant="outline" className="text-xs! shrink-0">
      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
      ID
    </Button>
  );
}
