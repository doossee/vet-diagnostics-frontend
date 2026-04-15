"use client";

import { AnimalType } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useGetAnimalTypeById, useGetAnimalTypesInfinite } from "@/entities/animal-types/services/animal-type-queries";
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
  const { locale } = useI18n();

  // When value is a string ID (from URL param), resolve it to a full object
  const stringId = typeof value === "string" ? value : null;
  const { data: resolvedById } = useGetAnimalTypeById(stringId);

  const defaultValue = typeof value === "object" && value !== null
    ? value as AnimalType
    : resolvedById ?? null;

  return (
    <TreeSelect<AnimalType>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={defaultValue as AnimalType}
      onSelect={(e) => onChange?.(e?.id, e!)}
      placeholder={placeholder}
      getOptionLabel={(option) => option.name?.[locale]}
      queryFn={(parentId) => useGetAnimalTypesInfinite(parentId)}
      disableFolderSelect
    />
  );
}
