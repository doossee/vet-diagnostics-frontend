"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { ChevronDown, Folder, FolderOpen, Check, Search, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/shared/components/elements/spinner";
import { pageableToArray } from "@/shared/helpers/pageable-to-array";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";

/* =======================
   Types
======================= */

export interface BaseTreeItem {
  id: string;
  parentId?: string | null;
  [key: string]: any;
}

interface TreeSelectProps<T extends BaseTreeItem> {
  value?: T | null;
  onSelect?: (value: T | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;

  /** boolean field from backend */
  childrenField: keyof T;

  /** hooks */
  useRootQuery: (
    enabled: boolean,
    search?: string
  ) => UseInfiniteQueryResult<any, Error>;

  useChildrenQuery: (
    parentId: string,
    enabled: boolean
  ) => UseInfiniteQueryResult<any, Error>;

  getLabel?: (item: T) => string;
}

/* =======================
   TreeNode
======================= */

function TreeNode<T extends BaseTreeItem>({
  item,
  level,
  selectedId,
  onSelect,
  childrenField,
  useChildrenQuery,
  getLabel,
}: {
  item: T;
  level: number;
  selectedId?: string | null;
  onSelect: (item: T) => void;
  childrenField: keyof T;
  useChildrenQuery: TreeSelectProps<T>["useChildrenQuery"];
  getLabel: (item: T) => string;
}) {
  const [open, setOpen] = React.useState(false);

  const hasChildren = item?._count?.children > 0;;

  /** ✅ hook always called */
  const childrenQuery = useChildrenQuery(item.id, open && hasChildren);
  const children = pageableToArray(childrenQuery.data);

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && childrenQuery.hasNextPage) {
      childrenQuery.fetchNextPage();
    }
  }, [inView, childrenQuery]);

  return (
    <div>
      <button
        role="button"
        type="button"
        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
        style={{ paddingLeft: 12 + level * 16 }}>
        {/* 📁 ICON — only toggle */}
        {hasChildren ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(v => !v);
            }}
            className="h-4 w-4 shrink-0"
          >
            {open ? (
              <FolderOpen className="h-4 w-4" />
            ) : (
              <Folder className="h-4 w-4" />
            )}
          </div>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* 🏷 LABEL — always selectable */}
        <div
          onClick={() => onSelect(item)}
          className="flex flex-1 items-center justify-between text-left"
        >
          <span className="truncate">
            {getLabel(item)}
          </span>

          <Check
            className={cn(
              "h-4 w-4 shrink-0",
              selectedId === item.id ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </button>


      {open && hasChildren && (
        <div>
          {children.map((child: any) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              childrenField={childrenField}
              useChildrenQuery={useChildrenQuery}
              getLabel={getLabel}
            />
          ))}

          {childrenQuery.isLoading && (
            <div className="py-2">
              <Spinner />
            </div>
          )}

          {childrenQuery.hasNextPage && <div ref={ref} />}
        </div>
      )}
    </div>
  );
}

/* =======================
   TreeSelect
======================= */

export function TreeSelect<T extends BaseTreeItem>({
  value,
  onSelect,
  placeholder = "Select",
  disabled,
  className,
  childrenField,
  useRootQuery,
  useChildrenQuery,
  getLabel = (item) => item.name ?? String(item.id),
}: TreeSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  /** root hook ALWAYS called */
  const rootQuery = useRootQuery(open, search || undefined);
  const rootItems = pageableToArray(rootQuery.data);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-between"
          >
            <span className="truncate">
              {value ? getLabel(value) : placeholder}
            </span>

            <div className="flex items-center gap-1">
              {value && (
                <X
                  className="h-4 w-4 opacity-50 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(null);
                  }}
                />
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 opacity-50" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          <div className="max-h-[260px] overflow-auto">
            {rootItems.map((item: any) => (
              <TreeNode
                key={item.id}
                item={item}
                level={0}
                selectedId={value?.id}
                onSelect={(v) => {
                  onSelect?.(v);
                  setOpen(false);
                  setSearch("");
                }}
                childrenField={childrenField}
                useChildrenQuery={useChildrenQuery}
                getLabel={getLabel}
              />
            ))}

            {rootQuery.isFetching && (
              <div className="p-2">
                <Spinner />
              </div>)}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
