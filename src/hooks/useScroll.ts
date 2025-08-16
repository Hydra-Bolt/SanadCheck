import { useCallback } from 'react'
import { scrollToElement } from '@/utils/common'

/**
 * Custom hook for scroll management
 */
export const useScroll = () => {
  const scrollTo = useCallback((elementId: string) => {
    scrollToElement(elementId)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    scrollTo,
    scrollToTop
  }
}
