"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

interface MonthYearPickerProps {
  year?: number | null;
  month?: number | null;
  onChange: (year: number | undefined, month: number | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  maxYear?: number;
  minYear?: number;
  className?: string;
}

export function MonthYearPicker({
  year,
  month,
  onChange,
  placeholder = "Выберите месяц и год",
  disabled,
  maxYear = new Date().getFullYear(),
  minYear = 1990,
  className,
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = year && month
    ? `${MONTHS[month - 1]} ${year}`
    : null;

  const years = React.useMemo(() => {
    const arr: number[] = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
  }, [maxYear, minYear]);

  const handleMonthChange = (val: string) => {
    onChange(year ?? undefined, Number(val));
  };

  const handleYearChange = (val: string) => {
    onChange(Number(val), month ?? undefined);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined, undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 font-normal",
            className,
          )}
        >
          {displayValue ? (
            <span className="truncate">{displayValue}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <div className="flex items-center gap-1 shrink-0">
            {displayValue && (
              <div onClick={handleClear} className="cursor-pointer opacity-50 hover:opacity-100">
                <X className="h-4 w-4" />
              </div>
            )}
            <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-3" align="start" sideOffset={5}>
        <div className="flex gap-2">
          <Select value={month ? String(month) : undefined} onValueChange={handleMonthChange}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Месяц" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((name, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year ? String(year) : undefined} onValueChange={handleYearChange}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Год" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
