import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

type PhoneInputProps = {
  value: string; // +998999999999
  onChange: (value: string) => void; // возвращаем plain number
  placeholder?: string;
  disabled?: boolean
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  disabled,
  placeholder = "+998 XX XXX XX XX",
}) => {
  const [displayValue, setDisplayValue] = useState(formatPhone(value));

  useEffect(() => {
    setDisplayValue(formatPhone(value));
  }, [value]);

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 12); // макс 12 цифр
    if (!digits) return "";
    // Формат: 998 XX XXX XX XX
    const parts = [];
    parts.push(digits.slice(0, 3)); // 998
    if (digits.length > 3) parts.push(digits.slice(3, 5)); // XX
    if (digits.length > 5) parts.push(digits.slice(5, 8)); // XXX
    if (digits.length > 8) parts.push(digits.slice(8, 10)); // XX
    if (digits.length > 10) parts.push(digits.slice(10, 12)); // XX
    return "+" + parts.join(" ");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    setDisplayValue(formatPhone(digits));
    onChange(digits);
  };

  return (
    <Input
      type="tel"
      disabled={disabled}
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
