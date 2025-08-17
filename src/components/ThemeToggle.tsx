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
        flex items-center justify-center p-2.5 rounded-lg
        transition-all duration-300 ease-in-out
        bg-white hover:bg-scholar-gray-50 border border-scholar-gray-200 shadow-soft hover:shadow-medium
        dark:bg-scholar-gray-700 dark:hover:bg-scholar-gray-600 dark:border-scholar-gray-600
        text-scholar-gray-600 hover:text-deep-blue
        dark:text-scholar-gray-300 dark:hover:text-deep-blue-300
        focus:outline-none focus:ring-2 focus:ring-deep-blue-500 focus:ring-offset-2
        dark:focus:ring-deep-blue-400 dark:focus:ring-offset-scholar-gray-800
        transform hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <SunIcon className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
      )}
    </button>
  )
}

export default ThemeToggle
