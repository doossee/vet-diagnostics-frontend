"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetAnimalColorsInfinite } from "@/entities/animal-colors/services/animal-color-queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function AnimalColorSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  return (
    <Autocomplete
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
