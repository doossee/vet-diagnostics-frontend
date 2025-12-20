"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Breed } from '@/shared/types';
import { useI18n } from '@/shared/hooks/use-i18n';
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetBreedsInfinite } from "@/entities/breeds/services/breed-queries";

interface Props {
  min?: boolean
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function BreedSelect({ placeholder, value, disabled, min, onChange, onRemove }: Props) {
  const { locale } = useI18n()

  return (
    <Autocomplete<Breed>
      minWidth={min}
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as Breed}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetBreedsInfinite}
      getOptionLabel={item => item?.[`name_${locale}`]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
