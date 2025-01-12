"use client"

import * as React from "react"
import { cn } from "~/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { CalendarComponent } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"

interface DatePickerProps {
    field: any
    errors?: any
    buttonClass?: string
}

export function DatePicker({field, buttonClass}: DatePickerProps) {
    return (<Popover>
        <PopoverTrigger asChild>
            {/* <FormControl> */}
                <Button variant={buttonClass?"secondary":"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground", buttonClass)}>
                    {field.value ? (format(field.value, "PPP")) : (
                    <span>Sanani belgilang</span>)}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            {/* </FormControl> */}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
                mode="single"
                initialFocus
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            />
        </PopoverContent>
    </Popover>)
}
