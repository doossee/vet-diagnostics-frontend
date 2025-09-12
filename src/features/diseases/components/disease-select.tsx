"use client";

import { Disease } from "@/shared/types";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetDiseasesInfinite } from "@/entities/diseases/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function DiseaseSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  return (
    <Autocomplete<Disease>
      hideSearch
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as any}
      getOptionLabel={(item) => `${new Date(item.startTime).toLocaleDateString()}-${new Date(item.endTime).toLocaleDateString()}`}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetDiseasesInfinite}
    />
  );
}
