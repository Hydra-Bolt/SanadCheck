import { ComponentType } from 'react'

interface LoadingStateProps {
  isLoading: boolean
  message?: string
  icon?: ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

export default function LoadingState({ 
  isLoading, 
  message = 'Loading...', 
  icon,
  size = 'md' 
}: LoadingStateProps) {
  if (!isLoading) return null

  return (
    <div className="flex items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-b-2 border-deep-blue ${sizeClasses[size]}`}></div>
      {message && (
        <span className="ml-3 text-scholar-gray-600 font-inter">{message}</span>
      )}
    </div>
  )
}
