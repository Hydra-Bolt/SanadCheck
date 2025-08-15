'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center justify-center p-2 rounded-lg
        transition-colors duration-200
        bg-white hover:bg-gray-100 border border-gray-200
        dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600
        text-gray-600 hover:text-gray-800
        dark:text-gray-300 dark:hover:text-gray-100
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  )
}

export default ThemeToggle
