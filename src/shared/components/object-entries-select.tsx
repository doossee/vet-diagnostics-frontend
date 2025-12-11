import { ReactNode } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

import { LanguageLocales } from "../types"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type Props<F extends FieldValues> = {
  name: keyof F
  label?: ReactNode
  placeholder?: ReactNode
  locale: LanguageLocales
  form: UseFormReturn<F, any, any>
  object: Record<string, Record<LanguageLocales, string>>
}

export function ObjectEntriesSelect<F extends FieldValues>({ name, form, label, object, placeholder, locale }: Props<F>) {

  return <FormField
    name={name as string}
    control={form.control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(object).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
}