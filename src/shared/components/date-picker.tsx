import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface DatePickerProps {
  field: any;
  errors?: any;
  buttonClass?: string;
  onRemove?: () => void;
  disabledToToday?: boolean;
}

export function DatePicker({ field, buttonClass, disabledToToday, onRemove }: DatePickerProps) {
  const t = useTranslations();
  
  const handleRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);
    e.stopPropagation()
    onRemove?.()
  }

  const handleChange = (date?: Date) => {
    field.onChange(date ?? null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={buttonClass ? "secondary" : "outline"} className={cn("pl-3 text-left flex font-normal gap-2 w-full", !field.value && "text-muted-foreground", buttonClass)}>
          <span className="flex-1">{field.value ? format(field.value, "PPP") : <span>{t("form.selectDate")}</span>}</span>
          {(field.value && onRemove) && <div onClick={handleRemove}><X className="z-1" /></div>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-1000 pointer-events-auto" align="start">
        <Calendar mode="single" autoFocus captionLayout="dropdown" selected={field.value} onSelect={handleChange} disabled={disabledToToday ? (date) => date > new Date() || date < new Date("1900-01-01") : false} />
      </PopoverContent>
    </Popover>
  );
}
