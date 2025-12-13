"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetProphylaxisDetailsInfinite } from "@/entities/prophylaxis-details/services/queries";
import { ProphylaxisDetail } from "@/shared/types";

interface Props {
  itemId?: string;
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function ProphylaxisDetailSelect({ value, placeholder, disabled, itemId, onChange, onRemove }: Props) {
  return (
    <Autocomplete<ProphylaxisDetail>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as ProphylaxisDetail}
      placeholder={placeholder}
      queryFn={search => useGetProphylaxisDetailsInfinite(itemId, search)}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={(item) => item.name_ru}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
