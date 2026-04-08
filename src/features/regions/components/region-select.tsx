"use client";

import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetRegionsInfinite } from "@/entities/regions/services/queries";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Region } from "@/shared/types";

interface Props {
  min?: boolean
  value?: unknown
  placeholder?: string
  onRemove?: () => void
  onChange?: (value: unknown) => void
}

export function RegionSelect({ value, placeholder, min, onChange, onRemove }: Props) {
  const { locale } = useI18n()
  
  return (
    <Autocomplete<Region>
      minWidth={min}
      onRemove={onRemove}
      defaultValue={value as Region}
      placeholder={placeholder}
      queryFn={useGetRegionsInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={(option) => option.name?.[locale]}
      clientSearch={(search, item) => searchUtil(search, item, ["id", "name"] as any)}
    />
  );
}
