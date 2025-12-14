"use client";

import { DiseaseCategory } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { useGetDiseaseTypesInfinite } from "@/entities/disease-types/services/queries";
import { TreeSelect } from "@/shared/components/tree-select";

interface Props {
  min?: boolean
  value?: unknown;
  parentId?: string | null;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown, obj: DiseaseCategory) => void;
}

export function DiseaseTypeTreeSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <TreeSelect<DiseaseCategory>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as DiseaseCategory}
      onSelect={(e) => onChange?.(e?.id, e!)}
      placeholder={placeholder}
      getOptionLabel={(option) => option[`name_${locale}`]}
      queryFn={(parentId) => useGetDiseaseTypesInfinite(parentId)}
    />
  );
}
