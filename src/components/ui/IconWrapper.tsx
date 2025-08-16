import { ComponentType, ReactNode } from 'react'

interface IconWrapperProps {
  icon: ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'feature'
  className?: string
  children?: ReactNode
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
}

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8', 
  xl: 'h-10 w-10'
}

const variantClasses = {
  primary: 'bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 dark:from-blue-600 dark:to-blue-700 text-white shadow-elegant',
  secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
  feature: 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
}

export default function IconWrapper({ 
  icon: Icon, 
  size = 'md',
  variant = 'primary',
  className = '',
  children 
}: IconWrapperProps) {
  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-xl flex items-center justify-center ${className}`}>
      <Icon className={`${iconSizes[size]} ${variant === 'primary' ? 'text-white' : ''}`} />
      {children}
    </div>
  )
}
