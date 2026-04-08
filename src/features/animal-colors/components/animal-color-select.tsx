"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Color } from '@/shared/types';
import { useI18n } from '@/shared/hooks/use-i18n';
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetAnimalColorsInfinite } from "@/entities/animal-colors/services/animal-color-queries";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";

interface Props {
  min?: boolean
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  animalTypeId?: string;
  onChange?: (value: unknown) => void;
}

export function AnimalColorSelect({ value, placeholder, animalTypeId, disabled, min, onChange, onRemove }: Props) {
  const { locale } = useI18n();
  const { get } = useSearchQueryParams();
  // const typeId = animalTypeId ?? get("animalTypeId");

  return (
    <Autocomplete<Color>
      minWidth={min}
      disabled={disabled}
      onRemove={onRemove}
      defaultValue={value as Color}
      placeholder={placeholder}
      onSelect={(e: any) => onChange?.(e?.id)}
      queryFn={(search) => useGetAnimalColorsInfinite(search, undefined)} // typeId ? String(typeId) : 
      getOptionLabel={item => item?.name?.[locale]}
      // extraLabel={item => item?.name?.[locale]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
