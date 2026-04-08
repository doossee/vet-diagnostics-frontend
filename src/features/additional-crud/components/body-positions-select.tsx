"use client";

import { BodyPosition } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetBodyPositions } from "@/entities/additional-crud/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function BodyPositionsSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as BodyPosition}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryType="query"
      queryFn={() => useGetBodyPositions()}
      hideSearch
      getOptionLabel={item => item?.name?.[locale]}
    />
  );
}


