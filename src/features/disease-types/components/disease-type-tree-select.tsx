"use client";

import { DiseaseCategory } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { TreeSelect } from "@/shared/components/tree-select";
import { useGetDiseaseTypesInfinite } from "@/entities/disease-types/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function DiseaseTypeTreeSelect({ placeholder, value, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <TreeSelect<DiseaseCategory>
      disabled={disabled}
      value={value as DiseaseCategory}
      placeholder={placeholder}
      useChildrenQuery={(parentId, enabled) => useGetDiseaseTypesInfinite(parentId, undefined, enabled)}
      useRootQuery={(enabled) => useGetDiseaseTypesInfinite(null, undefined, enabled)}
      childrenField="hasChildren"
      onSelect={(e: any) => onChange?.(e?.id)}
      getLabel={item => item?.[`name_${locale}`]}
    />
  );
}
