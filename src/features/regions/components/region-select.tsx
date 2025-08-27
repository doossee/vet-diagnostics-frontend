'use client'

import { UseFormReturn } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Autocomplete } from '@/shared/components/ui/autocomplete'
import { useGetRegionsInfinite } from '@/entities/regions/services/queries'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"

interface Props {
  name: string
  form: UseFormReturn<any, any, unknown>
}

export function RegionSelect({ name, form }: Props) {
  const { t } = useI18n()
 
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
            <FormLabel>{t('form.regionName')}</FormLabel>
            <FormControl>
              <Autocomplete onSelect={e => field.onChange(e?.id)} placeholder={t('form.regionName')} queryFn={useGetRegionsInfinite} />
            </FormControl>
          <FormMessage />
        </FormItem>
      )}
  />
  )
}