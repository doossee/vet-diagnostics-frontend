'use client'

import { ReactNode } from "react"
import { cn } from "@/shared/lib/utils"
import { Skeleton } from "../ui/skeleton"
import { SKELETON_TYPES } from "@/shared/constants"

type Props = {
  loading?: boolean
  className?: string
  children?: ReactNode
  type?: keyof typeof SKELETON_TYPES
}

export function SkeletonWrapper({ children, className, loading, type = "text" }: Props) {
  if(loading) return <Skeleton className={cn(SKELETON_TYPES[type], className)} />

  return children
}