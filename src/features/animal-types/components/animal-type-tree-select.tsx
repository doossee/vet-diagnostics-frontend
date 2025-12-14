"use client";

import { AnimalType } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useGetAnimalTypesInfinite } from "@/entities/animal-types/services/animal-type-queries";
import { TreeSelect } from "@/shared/components/tree-select";

interface Props {
  min?: boolean
  value?: unknown;
  parentId?: string | null;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown, obj: AnimalType) => void;
}

export function AnimalTypeTreeSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <TreeSelect<AnimalType>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as AnimalType}
      onSelect={(e) => onChange?.(e?.id, e!)}
      placeholder={placeholder}
      getOptionLabel={(option) => option[`name_${locale}`]}
      queryFn={(parentId) => useGetAnimalTypesInfinite(parentId)}
    />
  );
}
