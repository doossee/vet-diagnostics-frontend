import * as React from "react";
import { Input } from "@/shared/components/ui/input";

type InputNumberProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "inputMode" | "pattern"> & {
  value?: number | string | null;
  defaultValue?: number | string | null;
  onChange?: (value: number) => void;
};

function normalizeToNumber(value: unknown): number {
  if (typeof value === "number") {
    if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
    return Math.max(0, Math.trunc(value));
  }

  if (typeof value === "string") {
    const digits = value.replace(/[^\d]/g, "");
    if (!digits) return 0;

    const parsed = Number.parseInt(digits, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function InputNumber({ value, defaultValue, onChange, onKeyDown, onWheel, onBlur, ...props }: InputNumberProps) {
  const isControlled = typeof value !== "undefined";
  const [internalValue, setInternalValue] = React.useState<number>(() => normalizeToNumber(defaultValue ?? value ?? 0));
  const [displayValue, setDisplayValue] = React.useState<string>(() => formatNumber(normalizeToNumber(defaultValue ?? value ?? 0)));

  const normalizedControlledValue = normalizeToNumber(value);
  const normalizedValue = isControlled ? normalizedControlledValue : internalValue;

  React.useEffect(() => {
    setDisplayValue(formatNumber(normalizedValue));
  }, [normalizedValue]);

  const commitValue = React.useCallback(
    (next: number) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      setDisplayValue(formatNumber(next));
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = normalizeToNumber(event.target.value);
    commitValue(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
    onKeyDown?.(event);
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    onWheel?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const next = normalizeToNumber(event.currentTarget.value);

    if (next !== normalizedValue) {
      commitValue(next);
    } else {
      setDisplayValue(formatNumber(next));
    }

    onBlur?.(event);
  };

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onBlur={handleBlur}
    />
  );
}

