import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'scholarly' | 'gradient'
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const variantClasses = {
  default: 'bg-white dark:bg-scholar-gray-800 border border-scholar-gray-200 dark:border-scholar-gray-600 shadow-soft dark:shadow-xl',
  scholarly: 'bg-white dark:bg-scholar-gray-800 border border-sage-200 dark:border-scholar-gray-600 shadow-scholarly dark:shadow-xl scholarly-card',
  gradient: 'bg-gradient-to-br from-white to-sage-25 dark:from-scholar-gray-800 dark:to-scholar-gray-700 border border-sage-200 dark:border-scholar-gray-600 shadow-elegant dark:shadow-xl'
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  variant = 'default'
}: CardProps) {
  return (
    <div className={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}
