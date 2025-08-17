import { ReactNode, ButtonHTMLAttributes } from 'react'
import { ComponentType } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  icon?: ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary', 
  outline: 'bg-sage-100 dark:bg-gray-700 text-sage-700 dark:text-gray-300 font-semibold border border-sage-300 dark:border-gray-600 hover:bg-sage-200 dark:hover:bg-gray-600 transition-all duration-200',
  cta: 'bg-white dark:bg-gray-700 text-deep-blue-800 dark:text-blue-400 hover:bg-warm-tan-50 dark:hover:bg-gray-600 font-semibold transition-all duration-200 shadow-md hover:shadow-lg'
}

const sizeClasses = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-3 px-8 text-lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  
  const widthClass = fullWidth ? 'w-full' : 'inline-flex'
  
  const iconElement = Icon && (
    <Icon className={`h-5 w-5 ${iconPosition === 'left' ? 'mr-2' : 'ml-2'} ${loading ? 'animate-spin' : ''}`} />
  )

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {Icon && iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && iconElement}
    </button>
  )
}
