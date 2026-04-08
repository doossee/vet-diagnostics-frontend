"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetProphylaxisDetailsInfinite } from "@/entities/prophylaxis-details/services/queries";
import { ProphylaxisDetail } from "@/shared/types";
import { useI18n } from "@/shared/hooks/use-i18n";

interface Props {
  itemId?: string;
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function ProphylaxisDetailSelect({ value, placeholder, disabled, itemId, onChange, onRemove }: Props) {
  const { locale } = useI18n();

  return (
    <Autocomplete<ProphylaxisDetail>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as ProphylaxisDetail}
      placeholder={placeholder}
      queryFn={search => useGetProphylaxisDetailsInfinite(itemId, search)}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={item => item?.name?.[locale]}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
