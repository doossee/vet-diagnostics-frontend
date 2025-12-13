"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { FecesSmell } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetDungSmellsInfinite } from "@/entities/additional-crud/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function DungSmellsSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as FecesSmell}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetDungSmellsInfinite}
      getOptionLabel={item => item?.[`name_${locale}`]}
    />
  );
}
