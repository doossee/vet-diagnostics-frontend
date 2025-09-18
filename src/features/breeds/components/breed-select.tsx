"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetBreedsInfinite } from "@/entities/breeds/services/breed-queries";

interface Props {
  min?: boolean
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function BreedSelect({ placeholder, value, disabled, min, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      minWidth={min}
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetBreedsInfinite}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
