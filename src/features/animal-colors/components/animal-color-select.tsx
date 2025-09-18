"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetAnimalColorsInfinite } from "@/entities/animal-colors/services/animal-color-queries";

interface Props {
  min?: boolean
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function AnimalColorSelect({ value, placeholder, disabled, min, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      minWidth={min}
      disabled={disabled}
      onRemove={onRemove}
      defaultValue={value}
      placeholder={placeholder}
      onSelect={(e: any) => onChange?.(e?.id)}
      queryFn={useGetAnimalColorsInfinite}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
