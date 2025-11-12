"use client";

import { User } from "@/shared/types";
import { Autocomplete } from "@/shared/components/ui/autocomplete";
import { useGetVeterinariansInfinite } from "@/entities/users/services/queries";

interface Props {
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onRemove?: () => void;
  districtId?: number | null;
  onChange?: (value: unknown) => void;
}
// TODO: fix custom server filter
export function VeterinarianSelect({ value, placeholder, disabled, districtId, onChange, onRemove }: Props) {
  return (
    <Autocomplete<User>
      onRemove={onRemove}
      disabled={disabled}
      placeholder={placeholder}
      dependsOn={districtId}
      defaultValue={value as any}
      queryFn={useGetVeterinariansInfinite}
      onSelect={(e: any) => onChange?.(e?.id)}
      getOptionLabel={(item) => item.firstName + " " + item.lastName}
      customFilter={(item) => (districtId ? item.districtId === districtId : true)}
    />
  );
}
