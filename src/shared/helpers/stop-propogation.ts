import { MouseEvent } from "react";

export function StopPropagationHandler(callback: () => void) {
  return function (e: MouseEvent) {
    e.stopPropagation();
    callback();
  };
}

export function stopPropagation(e: MouseEvent) {
  e.stopPropagation();
}
