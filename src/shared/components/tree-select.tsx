"use client";

import type React from "react";
import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import type { PaginatedEntity } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/shared/components/elements/spinner";
import { pageableToArray } from "@/shared/helpers/pageable-to-array";
import { Check, Folder, FolderOpen, X, Inbox, ChevronDown, FolderX } from "lucide-react";
import type { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface TreeSelectProps<T> {
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  minWidth?: boolean;
  defaultValue?: T | string | number;
  onSelect?: (value: T | null) => void;
  onRemove?: () => void;
  queryFn: (parentId?: string | null) => UseInfiniteQueryResult<InfiniteData<PaginatedEntity<T>, unknown>, Error>;
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel?: (option: T) => string;
  getOptionId?: (option: T) => string;
  customFilter?: (option: T) => boolean;
  dependsOn?: unknown | null;
  disableFolderSelect?: boolean;
}

interface TreeNodesProps<T> {
  parentId: string | null;
  level: number;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onSelect: (option: T) => void;
  selectedId: string | null;
  queryFn: (parentId?: string | null) => UseInfiniteQueryResult<InfiniteData<PaginatedEntity<T>, unknown>, Error>;
  renderOption?: (option: T) => React.ReactNode;
  getOptionLabel: (option: T) => string;
  getOptionId: (option: T) => string;
  customFilter?: (option: T) => boolean;
  disableFolderSelect?: boolean;
}

function TreeNodes<T>({
  parentId,
  level,
  expanded,
  setExpanded,
  onSelect,
  selectedId,
  queryFn,
  renderOption,
  getOptionLabel,
  getOptionId,
  customFilter,
  disableFolderSelect,
}: TreeNodesProps<T>) {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = queryFn(parentId);
  const options = pageableToArray(data);

  const filteredOptions = useMemo(() => {
    return customFilter ? options.filter(customFilter) : options;
  }, [options, customFilter]);

  const { ref, inView } = useInView({ delay: 100 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading && level === 0) {
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    );
  }

  if (filteredOptions.length === 0 && !hasNextPage && !isLoading && level === 0) {
    return (
      <div className="px-3 py-4 text-sm text-muted-foreground text-center">
        <Inbox className="mx-auto h-8 w-8 opacity-50" />
        <p className="mt-2">Нет элементов</p>
      </div>
    );
  }

  const paddingLeft = 32 + ((level - 1) * 16);

  return (
    <>
      {filteredOptions.map((option) => {
        const id = getOptionId(option);
        const hasChildren = (option as any)._count?.children > 0;
        const isExpanded = expanded[id];
        const isSelected = selectedId === id;

        const handleIconClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (hasChildren) {
            setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
          }
        };

        const handleSelectClick = () => {
          if (disableFolderSelect && hasChildren) {
            setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
            return;
          }
          onSelect(option);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === " ") {
            e.preventDefault();
             if (hasChildren) {
              setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
            }
          }
        };

        return (
          <div key={id}>
            <button
              type="button"
              onClick={handleSelectClick}
              onKeyDown={handleKeyDown}
              style={{ paddingLeft }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-2">
                <div onClick={handleIconClick} className="shrink-0">
                  {hasChildren ? (
                    isExpanded ? (
                      <FolderOpen className="h-4 w-4 shrink-0" />
                    ) : (
                      <Folder fill="var(--sidebar-primary-foreground)" className="h-4 w-4 shrink-0" />
                    )
                  ) : (
                    <FolderX className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
                {renderOption ? renderOption(option) : <span>{getOptionLabel(option)}</span>}
              </div>

              {/* {!hasChildren && ( */}
              <Check className={cn("h-4 w-4 shrink-0", isSelected ? "opacity-100" : "opacity-0")} />
              {/* )} */}
            </button>

            {isExpanded && hasChildren && (
              <TreeNodes
                parentId={id}
                level={level + 1}
                expanded={expanded}
                setExpanded={setExpanded}
                onSelect={onSelect}
                selectedId={selectedId}
                queryFn={queryFn}
                renderOption={renderOption}
                getOptionLabel={getOptionLabel}
                getOptionId={getOptionId}
                customFilter={customFilter}
                disableFolderSelect={disableFolderSelect}
              />
            )}
          </div>
        );
      })}

      {isLoading && <div className="flex justify-center py-2">
        <Spinner />
      </div>}

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-2" />
      )}
    </>
  );
}

export function TreeSelect<T>({
  disabled,
  placeholder = "Выберите элемент",
  defaultValue,
  minWidth,
  onSelect,
  className,
  dependsOn,
  queryFn,
  onRemove,
  renderOption,
  customFilter,
  disableFolderSelect,
  getOptionLabel = (option: any) => option.name || option.label || String(option),
  getOptionId = (option: any) => option.id || String(option),
}: TreeSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Поддержка defaultValue как объекта
  const resolvedDefaultValue = useMemo(() => {
    if (!defaultValue) return null;
    if (typeof defaultValue === "object" && defaultValue !== null) {
      return defaultValue as T;
    }
    return null; // Если нужен поиск по ID — потребуется отдельный query
  }, [defaultValue]);

  useEffect(() => {
    if (defaultValue == null) {
      setValue(null);
      return;
    }

    if (typeof defaultValue === "object") {
      setValue(defaultValue as T);
      return;
    }

    // String/number ID — don't reset if current value already matches
    if (value && String(getOptionId(value)) === String(defaultValue)) return;
    setValue(null);
  }, [defaultValue]);

  useEffect(() => {
    if (resolvedDefaultValue && !value) {
      setValue(resolvedDefaultValue);
    }
  }, [resolvedDefaultValue, value]);

  useEffect(() => {
    if (dependsOn === null) {
      setValue(null);
      onSelect?.(null);
      onRemove?.();
    }
  }, [dependsOn, onSelect, onRemove]);

  const handleSelect = (option: T) => {
    setValue(option);
    setOpen(false);
    onSelect?.(option);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(null);
    setOpen(false);
    onSelect?.(null);
    onRemove?.();
  };

  const selectedId = value ? getOptionId(value) : null;

  return (
    <div className={cn("relative", minWidth ? "" : "w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            type="button"
            disabled={disabled}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9"
          >
            {value ? (
              <span className="truncate font-normal">{getOptionLabel(value)}</span>
            ) : (
              <span className="text-muted-foreground font-normal">{placeholder}</span>
            )}

            <div className="flex items-center gap-1">
              {value && (
                <div onClick={handleRemove} className="cursor-pointer opacity-50 hover:opacity-100">
                  <X className="h-4 w-4" />
                </div>
              )}
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")}
              />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={5} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
          <div className="max-h-[300px] overflow-auto overflow-x-hidden overscroll-contain"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}>
            <TreeNodes
              parentId={null}
              level={0}
              expanded={expanded}
              setExpanded={setExpanded}
              onSelect={handleSelect}
              selectedId={selectedId}
              queryFn={queryFn}
              renderOption={renderOption}
              getOptionLabel={getOptionLabel}
              getOptionId={getOptionId}
              customFilter={customFilter}
              disableFolderSelect={disableFolderSelect}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}