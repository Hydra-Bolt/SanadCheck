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
  default: 'bg-white border border-gray-200 shadow-sm',
  scholarly: 'bg-white border border-sage-200 scholarly-card',
  gradient: 'bg-gradient-to-br from-white to-sage-25 border border-sage-200'
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
