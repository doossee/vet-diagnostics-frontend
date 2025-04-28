import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/shared/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/shared/components/ui/button"
import { CalendarComponent } from "@/shared/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"

interface DatePickerProps {
    field: any
    errors?: any
    buttonClass?: string
}

export function DatePicker({field, buttonClass}: DatePickerProps) {
    const t = useTranslations()

    return (<Popover>
        <PopoverTrigger asChild>
            {/* <FormControl> */}
                <Button variant={buttonClass?"secondary":"outline"} className={cn("pl-3 text-left font-normal w-full", !field.value && "text-muted-foreground", buttonClass)}>
                    {field.value ? (format(field.value, "PPP")) : (
                    <span>{t("form.selectDate")}</span>)}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            {/* </FormControl> */}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-1000 pointer-events-auto" align="start">
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
