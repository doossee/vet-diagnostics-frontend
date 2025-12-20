"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { FecesColor } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetDungColorsInfinite } from "@/entities/dung-colors/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function DungColorSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();
  
  return (
    <Autocomplete<FecesColor>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as FecesColor}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetDungColorsInfinite}
      getOptionLabel={item => item?.[`name_${locale}`]}
      // clientSearch={(search, item) => 
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
