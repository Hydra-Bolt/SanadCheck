export const themeConfig = {
  colors: {
    light: {
      // Core Color Palette
      primary: '#1e3a8a',          // Deep blue - wisdom & trust
      primaryLight: '#3b82f6',     // Lighter blue for accents
      primaryDark: '#172554',      // Darker blue for depth
      secondary: '#1f2937',        // Deep charcoal
      accent: '#059669',           // Muted green - growth & harmony
      
      // Warm Scholar Tones
      warmTan: '#d2b48c',          // Classic parchment
      warmTanLight: '#f5f0e8',     // Soft cream
      warmTanDark: '#8b6914',      // Deep gold
      amber: '#d97706',            // Warm amber for highlights
      error: '#dc2626',            // Muted red for errors
      
      // Background & Surface Colors
      background: '#fefefe',       // Pure white with warmth
      backgroundSecondary: '#f8fafc', // Light grey-blue
      backgroundTertiary: '#f1f5f9',  // Softer grey
      paper: '#fffef7',            // Warm paper tone
      
      // Text Colors
      textPrimary: '#1f2937',      // Dark charcoal
      textSecondary: '#374151',    // Medium grey
      textMuted: '#6b7280',        // Light grey
      
      // Scholar specific colors
      scholarGray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      
      deepBlue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      
      mutedGreen: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      }
    },
    
    dark: {
      // Core Color Palette - Maintaining scholarly elegance in dark mode
      primary: '#60a5fa',          // Softer blue for dark backgrounds
      primaryLight: '#93c5fd',     // Lighter blue for accents
      primaryDark: '#3b82f6',      // Deeper blue for contrast
      secondary: '#e5e7eb',        // Light grey for text
      accent: '#34d399',           // Brighter green for dark mode visibility
      
      // Warm Scholar Tones - Adapted for dark mode
      warmTan: '#92400e',          // Darker amber tone
      warmTanLight: '#1f1611',     // Dark warm background
      warmTanDark: '#fbbf24',      // Bright gold for highlights
      amber: '#f59e0b',            // Brighter amber for visibility
      error: '#f87171',            // Softer red for dark mode
      
      // Background & Surface Colors
      background: '#0f1419',       // Deep dark blue-grey
      backgroundSecondary: '#1f2937', // Medium dark grey
      backgroundTertiary: '#374151',  // Lighter dark grey
      paper: '#1a1f2e',            // Dark paper tone with slight warmth
      
      // Text Colors
      textPrimary: '#f9fafb',      // Almost white for primary text
      textSecondary: '#e5e7eb',    // Light grey for secondary text
      textMuted: '#9ca3af',        // Medium grey for muted text
      
      // Scholar specific colors - Dark mode variants
      scholarGray: {
        50: '#111827',
        100: '#1f2937',
        200: '#374151',
        300: '#4b5563',
        400: '#6b7280',
        500: '#9ca3af',
        600: '#d1d5db',
        700: '#e5e7eb',
        800: '#f3f4f6',
        900: '#f9fafb',
      },
      
      deepBlue: {
        50: '#1e3a8a',
        100: '#1e40af',
        200: '#1d4ed8',
        300: '#2563eb',
        400: '#3b82f6',
        500: '#60a5fa',
        600: '#93c5fd',
        700: '#bfdbfe',
        800: '#dbeafe',
        900: '#eff6ff',
      },
      
      mutedGreen: {
        50: '#064e3b',
        100: '#065f46',
        200: '#047857',
        300: '#059669',
        400: '#10b981',
        500: '#34d399',
        600: '#6ee7b7',
        700: '#a7f3d0',
        800: '#d1fae5',
        900: '#ecfdf5',
      }
    }
  },
  
  // Shadows with scholarly warmth
  shadows: {
    light: {
      soft: '0 1px 3px 0 rgba(30, 58, 138, 0.1), 0 1px 2px 0 rgba(30, 58, 138, 0.06)',
      medium: '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)',
      large: '0 10px 15px -3px rgba(30, 58, 138, 0.1), 0 4px 6px -2px rgba(30, 58, 138, 0.05)',
      xl: '0 20px 25px -5px rgba(30, 58, 138, 0.1), 0 10px 10px -5px rgba(30, 58, 138, 0.04)',
      scholarly: '0 8px 32px rgba(30, 58, 138, 0.12), 0 2px 8px rgba(30, 58, 138, 0.08)',
      elegant: '0 12px 40px rgba(30, 58, 138, 0.15), 0 4px 16px rgba(30, 58, 138, 0.1)'
    },
    dark: {
      // Dark mode shadows with subtle warmth
      soft: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      medium: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      large: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      scholarly: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)',
      elegant: '0 12px 40px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4)'
    }
  },
  
  // Typography
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Lora', 'Georgia', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'monospace']
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Animation durations
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms'
  }
}

export type ThemeConfig = typeof themeConfig
