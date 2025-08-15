import { themeConfig } from './theme'

/**
 * Utility functions for working with themes
 */

export function getThemeValue(path: string, theme: 'light' | 'dark' = 'light') {
  const colors = themeConfig.colors[theme]
  const pathParts = path.split('.')
  let value: any = colors
  
  for (const part of pathParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part]
    } else {
      return undefined
    }
  }
  
  return typeof value === 'string' ? value : undefined
}

export function createThemeClass(baseClass: string, theme: 'light' | 'dark' = 'light') {
  // This can be extended later to return different classes based on theme
  return `${baseClass} theme-${theme}`
}

export function getResponsiveValue<T>(
  values: {
    base: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
    '2xl'?: T
  },
  breakpoint: keyof typeof values = 'base'
): T {
  return values[breakpoint] ?? values.base
}

/**
 * Create CSS custom properties string for inline styles
 */
export function createThemeVars(theme: 'light' | 'dark' = 'light'): Record<string, string> {
  const colors = themeConfig.colors[theme]
  const vars: Record<string, string> = {}
  
  // Flatten color object and create CSS custom properties
  const flattenColors = (obj: any, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const cssKey = prefix ? `${prefix}-${key}` : key
      if (typeof value === 'string') {
        vars[`--color-${cssKey}`] = value
      } else if (typeof value === 'object' && value !== null) {
        flattenColors(value, cssKey)
      }
    })
  }
  
  flattenColors(colors)
  return vars
}

/**
 * Helper to get theme-aware shadow values
 */
export function getThemeShadow(
  shadowName: keyof typeof themeConfig.shadows.light,
  theme: 'light' | 'dark' = 'light'
): string {
  const shadows = themeConfig.shadows as Record<'light' | 'dark', typeof themeConfig.shadows.light>
  return shadows[theme]?.[shadowName] || shadows['light'][shadowName]
}

/**
 * Get CSS class names that are theme-aware
 */
export function getThemeClasses(theme: 'light' | 'dark' = 'light') {
  const baseClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    backgroundSecondary: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    textMuted: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    border: theme === 'dark' ? 'border-gray-600' : 'border-gray-200',
    card: theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white' 
      : 'bg-white border-gray-200 text-gray-900',
    button: {
      primary: theme === 'dark'
        ? 'bg-blue-600 hover:bg-blue-500 text-white'
        : 'bg-deep-blue-600 hover:bg-deep-blue-700 text-white',
      secondary: theme === 'dark'
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600'
        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
    }
  }
  
  return baseClasses
}
