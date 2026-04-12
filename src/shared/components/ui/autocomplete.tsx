"use client";

import type React from "react";
import { ReactNode, useMemo } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/shared/components/elements/spinner";
import { pageableToArray } from "@/shared/helpers/pageable-to-array";
import { Check, ChevronDown, Search, Loader2, X, Inbox } from "lucide-react";
import type { UseInfiniteQueryResult, InfiniteData, UseQueryResult } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface AutocompleteBaseProps<T> {
  disabled?: boolean;
  className?: string;
  hideSearch?: boolean;
  placeholder?: string;
  minWidth?: boolean;
  defaultValue?: T | string | number;
  onSelect?: (value: T | null) => void;
  onRemove?: () => void
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel?: (option: T) => string;
  getOptionId?: (option: T) => string;
  clientSearch?: (search: string, option: T) => boolean;
  customFilter?: (option: T) => boolean;
  dependsOn?: unknown | null;
  queryParams?: Record<string, unknown>;
  extraLabel?: (option: T) => string;
}

type InfiniteQueryFn<T> = (search?: string | undefined, ...args: any[]) => UseInfiniteQueryResult<InfiniteData<{ data?: T[] }, unknown>, Error>;
type SimpleQueryFn<T> = (search?: string | undefined, ...args: any[]) => UseQueryResult<{ data?: T[] }, Error>;

type AutocompleteProps<T> =
  | (AutocompleteBaseProps<T> & {
      queryType?: "infinite";
      queryFn: InfiniteQueryFn<T>;
    })
  | (AutocompleteBaseProps<T> & {
      queryType: "query";
      queryFn: SimpleQueryFn<T>;
    });

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
  queryParams,
  extraLabel,
  queryType = "infinite",
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

  // Передаем queryParams как дополнительные аргументы в queryFn
  const queryParamsArray = queryParams ? Object.values(queryParams).filter(v => v !== null && v !== undefined) : [];
  const queryResult = queryFn(clientSearch ? undefined : search, ...queryParamsArray);
  const infiniteQueryResult = queryType === "infinite" ? (queryResult as UseInfiniteQueryResult<InfiniteData<{ data?: T[] }, unknown>, Error>) : null;
  const simpleQueryResult = queryType === "query" ? (queryResult as UseQueryResult<{ data?: T[] }, Error>) : null;

  const options = queryType === "infinite"
    ? pageableToArray(infiniteQueryResult?.data)
    : simpleQueryResult?.data?.data ?? [];
  const isLoading = queryType === "infinite" ? !!infiniteQueryResult?.isLoading : !!simpleQueryResult?.isLoading;
  const hasNextPage = queryType === "infinite" ? !!infiniteQueryResult?.hasNextPage : false;
  const isFetchingNextPage = queryType === "infinite" ? !!infiniteQueryResult?.isFetchingNextPage : false;

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
    if (queryType === "infinite" && inView && infiniteQueryResult?.hasNextPage) {
      infiniteQueryResult.fetchNextPage();
    }
  }, [queryType, inView, infiniteQueryResult]);

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
    <div className={cn("relative min-w-0", minWidth ? "" : "w-full", className)}>
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" type="button" disabled={disabled} aria-expanded={open} onClick={toggleDropdown}
            // className="w-full justify-between p-3 bg-input! border-input!"
            className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full min-w-0 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 overflow-hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            {value ? (
              <div className="flex items-center justify-start gap-2 font-normal flex-1">
                <div className="truncate block max-w-[calc(100%-20px)]">
                  {getOptionLabel(value)}
                  {/* {" "}{extraLabel && <span className="text-xs text-gray-600 truncate">({extraLabel(value)})</span>} */}
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground font-normal">{placeholder}</span>
            )}
            <div className="flex items-center shrink-0">
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
                    {renderOption ? renderOption(option) : <span>{getOptionLabel(option)} {extraLabel && <span className="text-xs text-gray-400">({extraLabel(option)})</span>}</span>}
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
