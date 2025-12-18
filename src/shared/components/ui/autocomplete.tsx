"use client";

import type React from "react";
import { useMemo } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect, useRef } from "react";
import type { PaginatedEntity } from "@/shared/types";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/shared/components/elements/spinner";
import { pageableToArray } from "@/shared/helpers/pageable-to-array";
import { Check, ChevronDown, Search, Loader2, X, Inbox } from "lucide-react";
import type { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface AutocompleteProps<T> {
  disabled?: boolean;
  className?: string;
  hideSearch?: boolean;
  placeholder?: string;
  minWidth?: boolean;
  defaultValue?: T | string | number;
  onSelect?: (value: T | null) => void;
  onRemove?: () => void
  queryFn: (search?: string | undefined) => UseInfiniteQueryResult<InfiniteData<PaginatedEntity<T>, unknown>, Error>;
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel?: (option: T) => string;
  getOptionId?: (option: T) => string;
  clientSearch?: (search: string, option: T) => boolean;
  customFilter?: (option: T) => boolean;
  dependsOn?: unknown | null
}

interface OptionItemProps<T> {
  option: T;
  isSelected: boolean;
  onSelect: (option: T) => void;
  children?: React.ReactNode;
}

export function OptionItem<T>({ option, isSelected, onSelect, children }: OptionItemProps<T>) {
  return (
    <button type="button" onClick={() => onSelect(option)} className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between">
      <div className="flex flex-col">{children}</div>
      <Check className={cn("ml-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
    </button>
  );
}

export function Autocomplete<T>({
  disabled,
  placeholder,
  defaultValue,
  hideSearch,
  minWidth,
  onSelect,
  className,
  dependsOn,
  queryFn,
  onRemove,
  renderOption,
  customFilter,
  getOptionLabel = (option: any) => option.name || option.label || String(option),
  getOptionId = (option: any) => option.id || String(option),
  clientSearch,
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView({ delay: 100 });
  const [value, setValue] = useState<T | null>(null);

  // TODO: server filters
  const handleSearch = useMemo(() => {
    return clientSearch
      ? (text: string) => setSearch(text)
      : debounce((text: string) => setSearch(text), 500);
  }, [clientSearch]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = queryFn(clientSearch ? undefined : search);

  const options = pageableToArray(data);

  const resolvedDefaultValue = useMemo(() => {
    if (!defaultValue) return null;

    if (typeof defaultValue === "object") {
      return defaultValue as T;
    }

    const foundOption = options.find((option) => String(getOptionId(option)) === String(defaultValue));
    return foundOption || null;
  }, [defaultValue, options, getOptionId]);

  const filteredOptions = useMemo(() => {
    if (clientSearch && search) {
      return options.filter((option) => (customFilter ? clientSearch(search, option) && customFilter(option) : clientSearch(search, option)));
    }
    return customFilter ? options.filter(customFilter) : options;
  }, [options, search, clientSearch, customFilter]);

  const allOptions = useMemo(() => {
    if (resolvedDefaultValue && !filteredOptions.some((option) => getOptionId(option) === getOptionId(resolvedDefaultValue))) {
      return [resolvedDefaultValue, ...filteredOptions];
    }
    return filteredOptions;
  }, [filteredOptions, resolvedDefaultValue, getOptionId]);

  useEffect(() => {
    if (resolvedDefaultValue && !value) {
      setValue(resolvedDefaultValue);
    }
  }, [resolvedDefaultValue]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if ('cancel' in handleSearch) (handleSearch as any).cancel?.();
    };
  }, [handleSearch]);

  useEffect(() => {
    if (typeof dependsOn !== "undefined" && dependsOn === null) {
      setValue(null);
      onSelect?.(null);
      onRemove?.();
    }
  }, [dependsOn]);

  // TODO: client search
  // useEffect(() => {
  //   if (
  //     clientSearch &&
  //     search &&
  //     options.length === 0 &&
  //     !hasNextPage &&
  //     !isLoading) {
  //     setSearch(search); 
  //   }
  // }, [clientSearch, search, options.length, hasNextPage, isLoading]);

  const handleSelect = (option: T) => {
    setValue(option);
    setOpen(false);
    setSearch("");
    onSelect?.(option);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    onSelect?.(null);
    setValue(null);
    onRemove?.()
  };

  const toggleDropdown = () => {
    setOpen(!open);
    if (!open) {
      setSearch("");
      // if(clientSearch) {
      //   setUseClientSearch(!!clientSearch)
      // }
    }
  };
  // TODO: bg
  return (
    <div className={cn("relative", minWidth ? "" : "w-full", className)}>
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" type="button" disabled={disabled} aria-expanded={open} onClick={toggleDropdown}
            // className="w-full justify-between p-3 bg-input! border-input!"
            className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            {value ? (
              <div className="flex items-center justify-start gap-2 truncate font-normal w-full">
                <div className="truncate block max-w-[calc(100%-20px)]">{getOptionLabel(value)}</div>
              </div>
            ) : (
              <span className="text-muted-foreground font-normal">{placeholder}</span>
            )}
            <div className="flex items-center">
              {value && (
                <div onClick={handleRemove} className="h-4 w-4 p-0 mr-1 opacity-50">
                  <X className="h-3 w-3" />
                </div>
              )}
              <ChevronDown className={cn("ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={5} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
          {!hideSearch && (
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} className="border-0 bg-transparent p-0 pl-3 focus-visible:ring-0 focus-visible:ring-offset-0" autoFocus />
              {isLoading && !clientSearch && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </div>
          )}

          <div
            className="max-h-[200px] overflow-auto"
            // style={{
            //   scrollBehavior: "smooth"
            // }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            // tabIndex={-1}
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
            >
            {allOptions.length === 0 && !isLoading && (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                <Inbox className="mx-auto" />
              </div>
            )}

            {allOptions.length > 0 && (
              <div>
                {allOptions.map((option, index) => (
                  <OptionItem key={getOptionId(option) + "-" + index} option={option} isSelected={value ? getOptionId(value) === getOptionId(option) : false} onSelect={handleSelect}>
                    {renderOption ? renderOption(option) : <span>{getOptionLabel(option)}</span>}
                  </OptionItem>
                ))}

                {hasNextPage && !clientSearch && (
                  <div ref={ref} className="flex justify-center">
                    {isFetchingNextPage && <Spinner />}
                  </div>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
