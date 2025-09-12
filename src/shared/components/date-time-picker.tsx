"use client";

import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FormControl } from "@/shared/components/ui/form";
import { Calendar } from "@/shared/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

export function DateTimePicker({ field }: { field: any }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    field.onChange(time);
  }, [time]);

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = time || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    setTime(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
            {field.value ? format(field.value, "MM/dd/yyyy HH:mm") : <span>mm/dd/yyyy hh:mm</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar initialFocus mode="single" selected={field.value} onSelect={(e) => setTime(e!)} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 24 }, (_, i) => i)
                  .reverse()
                  .map((hour) => (
                    <Button key={hour} size="icon" variant={field.value && field.value.getHours() === hour ? "default" : "ghost"} className="sm:w-full shrink-0 aspect-square" onClick={() => handleTimeChange("hour", hour.toString())}>
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={field.value && field.value.getMinutes() === minute ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("minute", minute.toString())}>
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
