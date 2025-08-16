/**
 * Utility functions for SanadCheck application
 */

/**
 * Smoothly scrolls to an element by ID
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Generates staggered animation delay classes
 * @param index - The index of the item
 * @param maxDelay - Maximum delay value (default: 6)
 */
export const getStaggerDelay = (index: number, maxDelay: number = 6): string => {
  const delay = Math.min(index + 1, maxDelay)
  return `animate-stagger-${delay}`
}

/**
 * Combines CSS classes, filtering out undefined/null values
 * @param classes - Array of class strings
 */
export const combineClasses = (...classes: (string | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
