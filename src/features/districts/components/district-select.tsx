"use client";

import { District } from "@/shared/types";
import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetDistrictsInfinite } from "@/entities/districts/services/queries";

interface Props {
  min?: boolean
  value?: unknown
  disabled?: boolean;
  placeholder?: string
  regionId?: number | null;
  onRemove?: () => void
  onChange?: (value: unknown) => void
}

export function DistrictSelect({ placeholder, value, disabled, regionId, min, onChange, onRemove }: Props) {
  return (
    <Autocomplete<District>
      minWidth={min}
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={value as any}
      onRemove={onRemove}
      queryFn={useGetDistrictsInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      customFilter={(item) => (regionId ? item.regionId === regionId : true)}
      clientSearch={(search, item) => searchUtil(search, item, ["id", "name"])}
    />
  );
}
