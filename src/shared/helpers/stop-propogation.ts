import { MouseEvent } from "react"

export function StopPropogationHander(callback: () => void) {
  return function(e: MouseEvent) {
    e.stopPropagation()
    callback()
  }
}