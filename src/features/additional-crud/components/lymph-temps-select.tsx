"use client";

import { LymphTemp } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetLymphTemps } from "@/entities/additional-crud/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function LymphTempsSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as LymphTemp}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryType="query"
      queryFn={() => useGetLymphTemps()}
      hideSearch
      getOptionLabel={item => item?.name?.[locale]}
    />
  );
}


