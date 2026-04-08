"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { useI18n } from "@/shared/hooks/use-i18n";
import { ProphylaxisItem, ProphylaxisType } from "@/shared/types";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetProphylaxisItemsInfinite } from "@/entities/prophylaxis-items/services/prophylaxis-items-queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  type?: ProphylaxisType;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function ProphylaxisItemSelect({ value, placeholder, disabled, type, onChange, onRemove }: Props) {
  const { locale } = useI18n();
  
  return (
    <Autocomplete<ProphylaxisItem>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as ProphylaxisItem}
      placeholder={placeholder}
      queryFn={search => useGetProphylaxisItemsInfinite(type, search)}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={item => item?.name?.[locale]}
    />
  );
}
