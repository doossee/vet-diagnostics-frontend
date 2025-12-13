"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { UrineClarity } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetUrineClaritiesInfinite } from "@/entities/additional-crud/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function UrineClaritiesSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as UrineClarity}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetUrineClaritiesInfinite}
      getOptionLabel={item => item?.[`name_${locale}`]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
