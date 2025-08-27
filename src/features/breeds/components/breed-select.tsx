'use client'

import debounce from 'lodash/debounce'
import { UseFormReturn } from "react-hook-form"
import { useI18n } from "@/shared/hooks/use-i18n"
import { Input } from '@/shared/components/ui/input'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from "react"
import { Spinner } from "@/shared/components/elements/spinner"
import { pageableToArray } from "@/shared/helpers/pageable-to-array"
import { useGetBreedsInfinite } from "@/entities/breeds/services/breed-queries"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

interface Props {
  name: string
  form: UseFormReturn<any, any, unknown>
}

export function BreedSelect({ name, form }: Props) {
  const { t } = useI18n()
  const [search, setSearch] = useState("")
	const { ref, inView } = useInView({ delay: 100 });
  const handleSearch = useCallback(debounce((text) => setSearch(text), 500), [])
  const { data, fetchNextPage, isFetchingNextPage } = useGetBreedsInfinite(search)

  useEffect(() => {
		if (inView) fetchNextPage();
	}, [fetchNextPage, inView]);

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field: { value, onChange, ...others } }) => (
          <FormItem>
              <FormLabel>{t('management.breedParent')}</FormLabel>
              <FormControl>
                  <Select value={value ? String(value) : ""} onValueChange={e => onChange(+e)} {...others}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('management.breedParent')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[250px]!">
                          <SelectItem value={"search"} disabled ref={ref} className="flex justify-center">
                            <Input onChange={e => handleSearch(e.target.value)} placeholder={t('search')} />
                          </SelectItem>
                          {
                            pageableToArray(data)?.map((b, i) => <SelectItem className="cursor-pointer hover:bg-accent" key={i} value={String(b.id)}>{b.name}</SelectItem>)
                          }
                          <SelectItem value={"fetch-next"} disabled ref={ref} className="flex justify-center">
                            {isFetchingNextPage && <Spinner />}
                          </SelectItem>
                      </SelectContent>
                  </Select>
              </FormControl>
              <FormMessage />
          </FormItem>
      )}
  />
  )
}