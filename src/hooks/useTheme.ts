'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { themeConfig } from '@/lib/theme'

/**
 * Hook to get theme-aware class names and utilities
 */
export function useThemeClasses() {
  const { theme } = useTheme()
  
  const getThemeColor = (colorPath: string) => {
    // Switch based on current theme
    const colors = themeConfig.colors[theme]
    
    // Navigate through the color object using the path
    const pathParts = colorPath.split('.')
    let color: any = colors
    
    for (const part of pathParts) {
      if (color && typeof color === 'object' && part in color) {
        color = color[part]
      } else {
        console.warn(`Theme color not found: ${colorPath}`)
        return undefined
      }
    }
    
    return typeof color === 'string' ? color : undefined
  }

  const getThemeClasses = () => {
    // Return theme-specific CSS classes
    if (theme === 'dark') {
      return {
        background: 'bg-gray-900',
        backgroundSecondary: 'bg-gray-800',
        text: 'text-gray-100',
        textMuted: 'text-gray-400',
        border: 'border-gray-700',
        card: 'bg-gray-800 border border-gray-700',
        button: {
          primary: 'bg-blue-600 hover:bg-blue-500 text-white',
          secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100'
        }
      }
    }
    
    // Light theme classes
    return {
      background: 'bg-white',
      backgroundSecondary: 'bg-scholar-gray-50',
      text: 'text-scholar-gray-800',
      textMuted: 'text-scholar-gray-600',
      border: 'border-scholar-gray-200',
      card: 'bg-white border border-scholar-gray-200',
      button: {
        primary: 'bg-deep-blue-600 hover:bg-deep-blue-700 text-white',
        secondary: 'bg-scholar-gray-100 hover:bg-scholar-gray-200 text-scholar-gray-800'
      }
    }
  }

  return {
    theme,
    getThemeColor,
    getThemeClasses,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}

/**
 * Hook to get theme-aware styles for inline styling
 */
export function useThemeStyles() {
  const { theme } = useTheme()
  
  const getThemeVar = (varName: string) => {
    // Return CSS custom property value
    // This allows us to use CSS variables that change with theme
    return `var(--${varName})`
  }

  const styles = {
    // Common style objects that adapt to theme
    card: {
      backgroundColor: getThemeVar('color-background'),
      borderColor: getThemeVar('color-border'),
      color: getThemeVar('color-text-primary')
    },
    text: {
      primary: { color: getThemeVar('color-text-primary') },
      secondary: { color: getThemeVar('color-text-secondary') },
      muted: { color: getThemeVar('color-text-muted') }
    },
    background: {
      primary: { backgroundColor: getThemeVar('color-background') },
      secondary: { backgroundColor: getThemeVar('color-background-secondary') }
    }
  }

  return {
    theme,
    styles,
    getThemeVar,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}
