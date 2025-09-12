"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetBreedsInfinite } from "@/entities/breeds/services/breed-queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function BreedSelect({ placeholder, value, disabled, onChange, onRemove }: Props) {
  return (
    <Autocomplete
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
