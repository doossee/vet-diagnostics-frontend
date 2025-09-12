"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetVaccineTypesInfinite } from "@/entities/vaccine-types/services/vaccine-type-queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function VaccineTypeSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value}
      placeholder={placeholder}
      queryFn={useGetVaccineTypesInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
