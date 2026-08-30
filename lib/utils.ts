import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, letting later Tailwind utilities win over earlier ones.
 *
 * The standard shadcn helper. `clsx` resolves conditionals and arrays; `twMerge`
 * then drops earlier utilities that the later ones would conflict with, so a
 * caller passing `className="p-8"` genuinely overrides a component's `p-4`
 * instead of both landing in the class list and letting source order decide.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
