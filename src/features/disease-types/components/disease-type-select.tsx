"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
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
  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value}
      placeholder={placeholder}
      queryFn={useGetDiseaseTypesInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
