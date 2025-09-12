"use client";

import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetRegionsInfinite } from "@/entities/regions/services/queries";

interface Props {
  value?: unknown
  placeholder?: string
  onRemove?: () => void
  onChange?: (value: unknown) => void
}

export function RegionSelect({ value, placeholder, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      onRemove={onRemove}
      defaultValue={value}
      placeholder={placeholder}
      queryFn={useGetRegionsInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      clientSearch={(search, item) => searchUtil(search, item, ["id", "name"] as any)}
    />
  );
}
