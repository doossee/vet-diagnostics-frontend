"use client";

import type React from "react";
import { useMemo } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/shared/lib/utils";
import type { PaginatedEntity } from "@/shared/types";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/shared/components/elements/spinner";
import { useState, useEffect, useRef, useCallback } from "react";
import { pageableToArray } from "@/shared/helpers/pageable-to-array";
import { Check, ChevronDown, Search, Loader2, X } from "lucide-react";
import type { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface AutocompleteProps<T> {
  disabled?: boolean;
  className?: string;
  hideSearch?: boolean;
  placeholder?: string;
  defaultValue?: T | string | number;
  onSelect?: (value: T | null) => void;
  onRemove?: () => void
  queryFn: (search?: string | undefined) => UseInfiniteQueryResult<InfiniteData<PaginatedEntity<T>, unknown>, Error>;
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel?: (option: T) => string;
  getOptionId?: (option: T) => string;
  clientSearch?: (search: string, option: T) => boolean;
  customFilter?: (option: T) => boolean;
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
  onSelect,
  className,
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
  // const [useClientSearch, setUseClientSearch] = useState(!!clientSearch)
  // TODO: cleint search when not next page
  // TODO: Text ellipse bug fix in select
  // TODO: server filters
  const handleSearch = useCallback(clientSearch ? (text: string) => setSearch(text) : debounce((text: string) => setSearch(text), 500), [clientSearch]);

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

  // useEffect(() => {
  //   if (clientSearch && !useClientSearch && search && options.length === 0 && !hasNextPage && !isLoading) {
  //     setUseClientSearch(true)
  //   }
  // }, [clientSearch, useClientSearch, search, options.length, hasNextPage, isLoading])

  const handleSelect = (option: T) => {
    setValue(option);
    setOpen(false);
    setSearch("");
    onSelect?.(option);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null);
    onSelect?.(null);
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

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" type="button" disabled={disabled} aria-expanded={open} onClick={toggleDropdown} className="w-full justify-between bg-transparent p-3">
            {value ? (
              <div className="flex items-center gap-2 truncate font-normal">
                <span className="truncate">{getOptionLabel(value)}</span>
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
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          {!hideSearch && (
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} className="border-0 bg-transparent p-0 pl-3 focus-visible:ring-0 focus-visible:ring-offset-0" autoFocus />
              {isLoading && !clientSearch && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </div>
          )}

          <div
            className="max-h-[200px] overflow-auto overscroll-contain"
            style={{ scrollBehavior: "smooth" }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            tabIndex={-1}>
            {allOptions.length === 0 && !isLoading && (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                <span>No Data.</span>
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
