"use client";

import { AnimalType } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetAnimalTypesInfinite } from "@/entities/animal-types/services/animal-type-queries";

interface Props {
  min?: boolean
  value?: unknown;
  parentId?: string;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function AnimalTypeSelect({ value, placeholder, disabled, min, parentId, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <Autocomplete<AnimalType>
      minWidth={min}
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as AnimalType}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      getOptionLabel={(option) => option[`name_${locale}`]}
      queryFn={(search) => useGetAnimalTypesInfinite(parentId, search)}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
