"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetProphylaxisItemsInfinite } from "@/entities/prophylaxis/services/prophylaxis-queries";
import { ProphylaxisItem, ProphylaxisType } from "@/shared/types";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  type?: ProphylaxisType;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function ProphylaxisItemSelect({ value, placeholder, disabled, type, onChange, onRemove }: Props) {
  return (
    <Autocomplete<ProphylaxisItem>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as ProphylaxisItem}
      placeholder={placeholder}
      queryFn={search => useGetProphylaxisItemsInfinite(type, search)}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={item => item.name_ru}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
