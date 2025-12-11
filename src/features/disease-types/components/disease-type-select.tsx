"use client";


// import { searchUtil } from "@/shared/helpers/search-util";
import { DiseaseCategory } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetDiseaseTypesInfinite } from "@/entities/disease-types/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function DiseaseTypeSelect({ placeholder, value, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <Autocomplete<DiseaseCategory>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as DiseaseCategory}
      placeholder={placeholder}
      queryFn={useGetDiseaseTypesInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={item => item?.[`name_${locale}`]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
