"use client";

import { Animal } from "@/shared/types";
// import { searchUtil } from "@/shared/helpers/search-util";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetAnimalsInfinite } from "@/entities/animals/services/animal-queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  typeId?: number | null;
  onChange?: (value: unknown) => void;
}

export function AnimalSelect({ onChange, onRemove, placeholder, value, disabled, typeId }: Props) {
  return (
    <Autocomplete<Animal>
      onRemove={onRemove}
      disabled={disabled}
      defaultValue={value as any}
      onSelect={(e: any) => onChange?.(e?.id)}
      placeholder={placeholder}
      queryFn={useGetAnimalsInfinite}
      getOptionLabel={(item) => item?.nameOrCode}
      customFilter={(item) => (typeId ? item.typeId === typeId : true)}
      // clientSearch={(search, item) =>
      //   searchUtil(search, item, ["id", "name"])
      // }
    />
  );
}
