"use client";

import { User } from "@/shared/types";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetFarmersInfinite } from "@/entities/users/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  districtId?: string | null;
  onChange?: (value: unknown) => void;
}

// TODO: fix custom server filter
export function FarmerSelect({ value, placeholder, disabled, districtId, onChange, onRemove }: Props) {
  return (
    <Autocomplete<User>
      onRemove={onRemove}
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={value as User}
      queryFn={useGetFarmersInfinite}
      onSelect={(e) => onChange?.(e?.id)}
      getOptionLabel={(item) => item.firstName + " " + item.lastName}
      customFilter={(item) => (districtId ? item.districtId === districtId : true)}
    />
  );
}
