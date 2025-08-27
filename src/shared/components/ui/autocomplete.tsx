"use client"

import { useMemo } from "react"

import type React from "react"

import debounce from "lodash/debounce"
import { cn } from "@/shared/lib/utils"
import type { PaginatedEntity } from "@/shared/types"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Spinner } from "@/shared/components/elements/spinner"
import { useState, useEffect, useRef, useCallback } from "react"
import { pageableToArray } from "@/shared/helpers/pageable-to-array"
import { Check, ChevronDown, Search, Loader2 } from "lucide-react"
import type { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query"

interface AutocompleteProps<T> {
  disabled?: boolean
  className?: string
  placeholder?: string
  defaultValue?: T
  onSelect?: (value: T | null) => void
  queryFn: (search?: string | undefined) => UseInfiniteQueryResult<InfiniteData<PaginatedEntity<T>, unknown>, Error>
  renderOption?: (option: T) => React.ReactNode
  getOptionLabel?: (option: T) => string
  getOptionId?: (option: T) => string
}

interface OptionItemProps<T> {
  option: T
  isSelected: boolean
  onSelect: (option: T) => void
  children?: React.ReactNode
}

export function OptionItem<T>({ option, isSelected, onSelect, children }: OptionItemProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between"
    >
      <div className="flex flex-col">{children}</div>
      <Check className={cn("ml-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
    </button>
  )
}

export function Autocomplete<T>({
  disabled,
  placeholder,
  defaultValue,
  onSelect,
  className,
  queryFn,
  renderOption,
  getOptionLabel = (option: any) => option.name || option.label || String(option),
  getOptionId = (option: any) => option.id || String(option),
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { ref, inView } = useInView({ delay: 100 })
  const [value, setValue] = useState<T | null>(defaultValue || null)

  const handleSearch = useCallback(
    debounce((text: string) => setSearch(text), 500),
    [],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = queryFn(search)

  const options = pageableToArray(data)

  const allOptions = useMemo(() => {
    if (defaultValue && !options.some((option) => getOptionId(option) === getOptionId(defaultValue))) {
      return [defaultValue, ...options]
    }
    return options
  }, [options, defaultValue, getOptionId])

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleSelect = (option: T) => {
    setValue(option)
    setOpen(false)
    setSearch("")
    onSelect?.(option)
  }

  const toggleDropdown = () => {
    setOpen(!open)
    if (!open) {
      setSearch("")
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <Button
        variant="outline"
        role="combobox"
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={toggleDropdown}
        className="w-full justify-between bg-transparent p-3"
      >
        {value ? (
          <div className="flex items-center gap-2 truncate font-normal">
            <span className="truncate">{getOptionLabel(value)}</span>
          </div>
        ) : (
          <span className="text-muted-foreground font-normal">{placeholder}</span>
        )}
        <div className="flex items-center">
          <ChevronDown className={cn("ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")} />
        </div>
      </Button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border rounded-md shadow-md"
        >
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={placeholder}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </div>

          <div className="max-h-[200px] overflow-auto">
            {allOptions.length === 0 && !isLoading && (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                <span>No Data.</span>
              </div>
            )}

            {allOptions.length > 0 && (
              <div>
                {allOptions.map((option, index) => (
                  <OptionItem
                    key={getOptionId(option) + "-" + index}
                    option={option}
                    isSelected={value ? getOptionId(value) === getOptionId(option) : false}
                    onSelect={handleSelect}
                  >
                    {renderOption ? renderOption(option) : <span>{getOptionLabel(option)}</span>}
                  </OptionItem>
                ))}

                {hasNextPage && (
                  <div ref={ref} className="flex justify-center">
                    {isFetchingNextPage && <Spinner />}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}



// const handleClear = () => {
//   setValue(null)
//   setSearch("")
//   onSelect?.(null)
// }
// {/* {value && <X onClick={StopPropogationHander(handleClear)} className="h-4 w-4 opacity-50" />} */}