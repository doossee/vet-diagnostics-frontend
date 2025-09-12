"use client";

// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetEyeLidsInfinite } from "@/entities/eye-lid/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  onChange?: (value: unknown) => void;
}

export function EyeLidSelect({ value, placeholder, disabled, onChange, onRemove }: Props) {
  return (
    <Autocomplete
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value}
      placeholder={placeholder}
      queryFn={useGetEyeLidsInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
