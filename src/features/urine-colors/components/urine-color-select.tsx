"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { UrineColor } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetUrineColorsInfinite } from "@/entities/urine-colors/services/queries";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function UrineColorSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  const { locale } = useI18n();
  const { get } = useSearchQueryParams();
  // const animalTypeId = get("animalTypeId");

  return (
    <Autocomplete<UrineColor>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as UrineColor}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={(search) => useGetUrineColorsInfinite(search, undefined)}
      getOptionLabel={item => item?.[`name_${locale}`]}
      extraLabel={item => item?.animalType?.[`name_${locale}`]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
