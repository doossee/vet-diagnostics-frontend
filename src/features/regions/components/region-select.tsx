"use client";

import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetRegionsInfinite } from "@/entities/regions/services/queries";

interface Props {
  min?: boolean
  value?: unknown
  placeholder?: string
  onRemove?: () => void
  onChange?: (value: unknown) => void
}

export function RegionSelect({ value, placeholder, min, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      minWidth={min}
      onRemove={onRemove}
      defaultValue={value}
      placeholder={placeholder}
      queryFn={useGetRegionsInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      clientSearch={(search, item) => searchUtil(search, item, ["id", "name"] as any)}
    />
  );
}
