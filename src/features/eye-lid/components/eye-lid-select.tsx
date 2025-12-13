"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { useI18n } from "@/shared/hooks/use-i18n";
import { MucosaAppearance, MucosaType } from "@/shared/types";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetEyeLidsInfinite } from "@/entities/eye-lid/services/queries";

interface Props {
  value?: unknown;
  type?: MucosaType
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function EyeLidSelect({ value, placeholder, disabled, type, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete<MucosaAppearance>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as MucosaAppearance}
      placeholder={placeholder}
      queryFn={search => useGetEyeLidsInfinite(type, search)}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={item => item?.[`name_${locale}`]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
