/**
 * cn - Utility function for merging Tailwind CSS classes
 * 
 * Combines clsx and tailwind-merge to intelligently merge class names.
 * Used by ShadCN UI components.
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4' (px-2 is overridden by px-4)
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
