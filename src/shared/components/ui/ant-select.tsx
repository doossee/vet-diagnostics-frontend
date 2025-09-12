"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, XIcon, SearchIcon } from "lucide-react";

// Основные типы для Ant Design Select
export interface AntSelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  className?: string;
  title?: string;
}

export interface AntSelectOptGroup {
  label: React.ReactNode;
  key?: string;
  className?: string;
  title?: string;
  options: AntSelectOption[];
}

export interface AntSelectProps {
  // Основные пропсы
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  autoClearSearchValue?: boolean;
  autoFocus?: boolean;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string | string[] | number | number[];
  disabled?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  dropdownRender?: (originNode: React.ReactNode) => React.ReactNode;
  dropdownStyle?: React.CSSProperties;
  filterOption?: boolean | ((inputValue: string, option: AntSelectOption) => boolean);
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  labelInValue?: boolean;
  listHeight?: number;
  loading?: boolean;
  maxCount?: number;
  maxTagCount?: number | "responsive";
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: any[]) => React.ReactNode);
  maxTagTextLength?: number;
  mode?: "multiple" | "tags";
  notFoundContent?: React.ReactNode;
  open?: boolean;
  optionFilterProp?: string;
  optionLabelProp?: string;
  options?: (AntSelectOption | AntSelectOptGroup)[];
  placeholder?: React.ReactNode;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  removeIcon?: React.ReactNode;
  searchValue?: string;
  showSearch?: boolean;
  size?: "large" | "middle" | "small";
  status?: "error" | "warning";
  suffixIcon?: React.ReactNode;
  tagRender?: (props: any) => React.ReactNode;
  tokenSeparators?: string[];
  value?: string | string[] | number | number[];
  variant?: "outlined" | "borderless" | "filled";
  virtual?: boolean;

  // События
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (value: any, option: any) => void;
  onClear?: () => void;
  onDeselect?: (value: string | number) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onPopupScroll?: (event: React.UIEvent) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string | number, option: AntSelectOption) => void;

  // Дополнительные пропсы
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Основной компонент AntSelect
const AntSelect = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Root>, AntSelectProps>(
  (
    {
      allowClear = false,
      autoClearSearchValue = true,
      autoFocus = false,
      defaultActiveFirstOption = true,
      defaultOpen,
      defaultValue,
      disabled = false,
      dropdownClassName,
      dropdownMatchSelectWidth = true,
      dropdownRender,
      dropdownStyle,
      filterOption = true,
      getPopupContainer,
      labelInValue = false,
      listHeight = 256,
      loading = false,
      maxCount,
      maxTagCount,
      maxTagPlaceholder,
      maxTagTextLength,
      mode,
      notFoundContent = "Not Found",
      open,
      optionFilterProp = "value",
      optionLabelProp = "children",
      options = [],
      placeholder,
      placement = "bottomLeft",
      removeIcon,
      searchValue,
      showSearch,
      size = "middle",
      status,
      suffixIcon,
      tagRender,
      tokenSeparators,
      value,
      variant = "outlined",
      virtual = true,
      onBlur,
      onChange,
      onClear,
      onDeselect,
      onDropdownVisibleChange,
      onFocus,
      onInputKeyDown,
      onPopupScroll,
      onSearch,
      onSelect,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue || (mode === "multiple" || mode === "tags" ? [] : ""));
    const [searchText, setSearchText] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(defaultOpen || false);

    const currentValue = value !== undefined ? value : internalValue;
    const isMultiple = mode === "multiple" || mode === "tags";
    const shouldShowSearch = showSearch !== undefined ? showSearch : isMultiple;

    // Обработка изменения значения
    const handleValueChange = (newValue: string) => {
      if (isMultiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newArray = currentArray.includes(newValue) ? currentArray.filter((v) => v !== newValue) : [...currentArray, newValue];

        if (value === undefined) {
          setInternalValue(newArray);
        }
        onChange?.(newArray, null);
      } else {
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, null);
        setIsOpen(false);
      }
    };

    // Обработка очистки
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const clearedValue = isMultiple ? [] : "";
      if (value === undefined) {
        setInternalValue(clearedValue);
      }
      onChange?.(clearedValue, null);
      onClear?.();
    };

    // Фильтрация опций
    const filteredOptions = React.useMemo(() => {
      if (!shouldShowSearch || !searchText) return options;

      return options.filter((option) => {
        if ("options" in option) {
          // Это группа опций
          const filteredGroupOptions = option.options.filter((opt) => {
            const searchIn = optionFilterProp === "label" ? opt.label : opt.value;
            return String(searchIn).toLowerCase().includes(searchText.toLowerCase());
          });
          return filteredGroupOptions.length > 0;
        } else {
          // Это обычная опция
          const searchIn = optionFilterProp === "label" ? option.label : option.value;
          return String(searchIn).toLowerCase().includes(searchText.toLowerCase());
        }
      });
    }, [options, searchText, shouldShowSearch, optionFilterProp]);

    // Получение размеров
    const getSizeClasses = () => {
      switch (size) {
        case "large":
          return "h-10 px-3 text-base";
        case "small":
          return "h-6 px-2 text-xs";
        default:
          return "h-8 px-3 text-sm";
      }
    };

    // Получение вариантов стилей
    const getVariantClasses = () => {
      switch (variant) {
        case "filled":
          return "bg-gray-50 border-transparent hover:bg-gray-100 focus:bg-white focus:border-blue-500";
        case "borderless":
          return "border-transparent shadow-none hover:bg-gray-50 focus:bg-gray-50";
        default:
          return "bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
      }
    };

    // Получение статусных классов
    const getStatusClasses = () => {
      switch (status) {
        case "error":
          return "border-red-500 focus:border-red-500 focus:ring-red-200";
        case "warning":
          return "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-200";
        default:
          return "";
      }
    };

    // Рендер выбранных значений для множественного выбора
    const renderMultipleValues = () => {
      if (!isMultiple || !Array.isArray(currentValue) || currentValue.length === 0) {
        return null;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {currentValue.map((val, index) => {
            const option = options.find((opt) => (opt?.value ? opt.value === val : opt.options?.some((o) => o.value === val)));
            const optionData = option?.value ? option : option?.options?.find((o) => o.value === val);

            return (
              <span key={`${val}-${index}`} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded border">
                {optionData?.label || val}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValueChange(String(val));
                  }}
                  className="hover:bg-gray-200 rounded p-0.5">
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      );
    };

    // Рендер одиночного значения
    const renderSingleValue = () => {
      if (isMultiple) return null;

      const option = options.find((opt) => (opt?.value ? opt.value === currentValue : opt.options?.some((o) => o.value === currentValue)));
      const optionData = option?.value ? option : option?.options?.find((o) => o.value === currentValue);

      return optionData?.label || currentValue || placeholder;
    };

    return (
      <SelectPrimitive.Root
        open={open !== undefined ? open : isOpen}
        onOpenChange={(newOpen) => {
          setIsOpen(newOpen);
          onDropdownVisibleChange?.(newOpen);
        }}
        value={isMultiple ? undefined : String(currentValue)}
        onValueChange={isMultiple ? undefined : handleValueChange}
        disabled={disabled}
        {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn("flex items-center justify-between w-full rounded border transition-colors outline-none", getSizeClasses(), getVariantClasses(), getStatusClasses(), disabled && "opacity-50 cursor-not-allowed", className)}
          style={style}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onInputKeyDown}>
          <div className="flex-1 flex items-center gap-2 min-w-0">{isMultiple ? renderMultipleValues() : <span className={cn("truncate", !currentValue && "text-gray-400")}>{renderSingleValue()}</span>}</div>

          <div className="flex items-center gap-1 ml-2">
            {allowClear && currentValue && (
              <button type="button" onClick={handleClear} className="hover:bg-gray-100 rounded p-1 transition-colors">
                <XIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}

            <SelectPrimitive.Icon asChild>{suffixIcon || <ChevronDownIcon className="w-4 h-4 text-gray-400" />}</SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-900 shadow-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              dropdownClassName,
            )}
            style={{
              ...dropdownStyle,
              maxHeight: listHeight,
              minWidth: dropdownMatchSelectWidth ? "var(--radix-select-trigger-width)" : undefined,
            }}
            position="popper"
            onScroll={onPopupScroll}>
            {shouldShowSearch && (
              <div className="flex items-center border-b px-3 py-2">
                <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  className="flex-1 outline-none text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
              <ChevronUpIcon className="w-4 h-4" />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="p-1">
              {loading ? (
                <div className="flex items-center justify-center py-6 text-sm text-gray-500">Loading...</div>
              ) : filteredOptions.length === 0 ? (
                <div className="flex items-center justify-center py-6 text-sm text-gray-500">{notFoundContent}</div>
              ) : (
                filteredOptions.map((option, index) => {
                  if ("options" in option) {
                    // Рендер группы опций
                    return (
                      <SelectPrimitive.Group key={option.key || index}>
                        <SelectPrimitive.Label className="px-2 py-1.5 text-xs font-semibold text-gray-500">{option.label}</SelectPrimitive.Label>
                        {option.options.map((groupOption) => (
                          <SelectPrimitive.Item
                            key={groupOption.value}
                            value={String(groupOption.value)}
                            disabled={groupOption.disabled}
                            className={cn(
                              "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                              "focus:bg-blue-50 focus:text-blue-900",
                              "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                              groupOption.className,
                            )}
                            onSelect={() => {
                              if (isMultiple) {
                                handleValueChange(String(groupOption.value));
                              }
                              onSelect?.(groupOption.value, groupOption);
                            }}>
                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              <SelectPrimitive.ItemIndicator>
                                <CheckIcon className="h-4 w-4" />
                              </SelectPrimitive.ItemIndicator>
                            </span>
                            <SelectPrimitive.ItemText>{groupOption.label}</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        ))}
                      </SelectPrimitive.Group>
                    );
                  } else {
                    // Рендер обычной опции
                    return (
                      <SelectPrimitive.Item
                        key={option.value}
                        value={String(option.value)}
                        disabled={option.disabled}
                        className={cn(
                          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                          "focus:bg-blue-50 focus:text-blue-900",
                          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          option.className,
                        )}
                        onSelect={() => {
                          if (isMultiple) {
                            handleValueChange(String(option.value));
                          }
                          onSelect?.(option.value, option);
                        }}>
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <CheckIcon className="h-4 w-4" />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    );
                  }
                })
              )}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
              <ChevronDownIcon className="w-4 h-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

AntSelect.displayName = "AntSelect";

export { AntSelect };
